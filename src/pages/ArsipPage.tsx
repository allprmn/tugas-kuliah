import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { supabase } from '../lib/supabaseClient';
import type { Task } from '../types';

export default function ArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [archives, setArchives] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data yang sudah selesai dari Supabase
  useEffect(() => {
    const fetchArchives = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', true)
        .order('deadline', { ascending: false }); // Urutkan dari yang terbaru

      if (!error && data) setArchives(data);
      setIsLoading(false);
    };

    fetchArchives();
  }, []);

  // Filter pencarian
  const filteredArchives = archives.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Arsip Tugas Selesai</h1>
                <p className="text-on-surface-variant mt-1 text-sm">Daftar seluruh tugas kuliah yang telah kamu tuntaskan.</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 mb-space-lg flex flex-col md:flex-row gap-4 shadow-sm">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input 
                  type="text"
                  placeholder="Cari tugas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
              {isLoading ? (
                <div className="text-center py-10 text-on-surface-variant">Memuat data arsip...</div>
              ) : filteredArchives.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">inventory_2</span>
                  <h3 className="text-lg font-semibold text-on-surface">Arsip Kosong</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Belum ada tugas yang diselesaikan.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                        <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider w-16 text-center">Status</th>
                        <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider">Tugas & Mata Kuliah</th>
                        <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider whitespace-nowrap">Tenggat Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {filteredArchives.map((task) => (
                        <tr key={task.id} className="hover:bg-surface-container transition-colors group">
                          <td className="py-4 px-4 text-center align-top">
                            <div className="w-7 h-7 mx-auto rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
                              <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <div className="flex flex-col">
                              <h4 className="font-semibold text-on-surface">{task.title}</h4>
                              <p className="text-xs text-on-surface-variant mt-1">{task.course}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top whitespace-nowrap">
                            <span className="text-sm text-on-surface">{task.deadline}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}