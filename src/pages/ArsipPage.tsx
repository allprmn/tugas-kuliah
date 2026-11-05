import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { initialArchives } from '../data/archiveData';

export default function ArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pencarian sederhana
  const filteredArchives = initialArchives.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper untuk Icon Berkas
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'zip': return { icon: 'folder_zip', color: 'text-secondary' };
      case 'pdf': return { icon: 'picture_as_pdf', color: 'text-error' };
      case 'xlsx': return { icon: 'table_chart', color: 'text-tertiary' };
      case 'png': return { icon: 'image', color: 'text-primary' };
      case 'link': return { icon: 'link', color: 'text-secondary' };
      default: return { icon: 'insert_drive_file', color: 'text-outline' };
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-6xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Arsip Tugas Selesai</h1>
                <p className="text-on-surface-variant mt-1 text-sm">Daftar seluruh tugas kuliah yang telah kamu tuntaskan.</p>
              </div>
              
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-medium text-sm shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Ekspor Rekap
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-surface-container-low rounded-xl p-4 mb-space-lg flex flex-col md:flex-row gap-4 shadow-sm">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input 
                  type="text"
                  placeholder="Cari nama tugas, mata kuliah, atau kode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="flex gap-2">
                <select className="h-10 px-3 rounded-lg bg-surface-container text-on-surface text-sm border-none focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer">
                  <option>Semua Semester</option>
                  <option>Semester 5</option>
                  <option>Semester 4</option>
                </select>
                <select className="h-10 px-3 rounded-lg bg-surface-container text-on-surface text-sm border-none focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer">
                  <option>Terbaru Diselesaikan</option>
                  <option>Nilai Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Tabel Arsip */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                      <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider w-16 text-center">Status</th>
                      <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider">Tugas & Mata Kuliah</th>
                      <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider whitespace-nowrap">Tgl Selesai</th>
                      <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider">Nilai</th>
                      <th className="py-3 px-4 text-xs font-semibold text-outline uppercase tracking-wider">Berkas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {filteredArchives.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-on-surface-variant">
                          Tidak ada data arsip yang ditemukan.
                        </td>
                      </tr>
                    ) : (
                      filteredArchives.map((task) => {
                        const fileDetails = getFileIcon(task.fileType);
                        return (
                          <tr key={task.id} className="hover:bg-surface-container transition-colors group">
                            {/* Status */}
                            <td className="py-4 px-4 text-center align-top">
                              <div className="w-7 h-7 mx-auto rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                              </div>
                            </td>
                            
                            {/* Tugas Info */}
                            <td className="py-4 px-4 align-top">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-primary">
                                    {task.courseCode}
                                  </span>
                                  <span className="text-xs text-outline">{task.course}</span>
                                </div>
                                <h4 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                                  {task.title}
                                </h4>
                                <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px] text-tertiary">chat</span>
                                  "{task.feedback}"
                                </p>
                              </div>
                            </td>

                            {/* Tanggal */}
                            <td className="py-4 px-4 align-top whitespace-nowrap">
                              <span className="text-sm text-on-surface">{task.completedDate}</span>
                            </td>

                            {/* Nilai */}
                            <td className="py-4 px-4 align-top">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high w-fit">
                                <span className="text-sm font-bold text-tertiary">{task.score}</span>
                                <span className="text-xs font-semibold text-primary">({task.grade})</span>
                              </div>
                            </td>

                            {/* Berkas & Aksi */}
                            <td className="py-4 px-4 align-top">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded bg-surface-container-high flex items-center justify-center ${fileDetails.color}`}>
                                    <span className="material-symbols-outlined text-[18px]">{fileDetails.icon}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-on-surface truncate max-w-[120px]">{task.fileName}</span>
                                    <span className="text-[11px] text-outline">Terarsip</span>
                                  </div>
                                </div>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Buka Berkas">
                                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}