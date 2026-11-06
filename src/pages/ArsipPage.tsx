import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { supabase } from '../lib/supabaseClient';
import type { Task } from '../types';

export default function ArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [archives, setArchives] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 1. State pencarian
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArchives = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', true)
        .order('deadline', { ascending: false });

      if (!error && data) setArchives(data);
      setIsLoading(false);
    };

    fetchArchives();
  }, []);

  // 2. Filter tabel berdasarkan state searchQuery
  const filteredArchives = archives.filter(task => 
    (task.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (task.course || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.course_code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        
        {/* 3. Kirim state ke Header */}
        <Header 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Arsip Tugas Selesai</h1>
                <p className="text-on-surface-variant mt-1 text-sm">Daftar seluruh tugas kuliah yang telah kamu tuntaskan.</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 mt-4">
              {isLoading ? (
                <div className="text-center py-10 text-on-surface-variant">Memuat data arsip...</div>
              ) : filteredArchives.length === 0 ? (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">inventory_2</span>
                  <h3 className="text-lg font-semibold text-on-surface">Arsip Tidak Ditemukan</h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {searchQuery ? `Tidak ada arsip yang cocok dengan pencarian "${searchQuery}".` : 'Belum ada tugas yang diselesaikan.'}
                  </p>
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
                              <p className="text-xs text-on-surface-variant mt-1 font-medium">
                                {task.course} ({task.course_code})
                              </p>
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