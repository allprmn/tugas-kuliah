import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { initialTasks } from '../data/mockData';

export default function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-x-hidden">
      
      {/* Kirim state ke Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Wrapper padding kiri akan berubah tergantung state */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        
        {/* Kirim state dan fungsi toggle ke Header */}
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

                {/* Area Konten Utama */}
                <main className="relative w-full pt-16 bg-background min-h-screen px-gutter">
                    <div className="flex flex-col w-full pb-16 pt-6">

                        {/* Header Greeting */}
                        <div className="relative w-full mb-space-lg">
                            <div className="absolute -top-10 left-1/4 w-96 h-32 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md relative z-10">
                                <div>
                                    <div className="flex items-center gap-space-xs mb-1.5">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary text-label-sm font-label-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                            Semester Ganjil 2024/2025
                                        </span>
                                        <span className="text-outline text-label-sm font-label-sm">• Minggu ke-9</span>
                                    </div>
                                    <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
                                        Halo Nadia! Kelola tugas kuliahmu dengan terorganisir.
                                    </h1>
                                    <p className="text-on-surface-variant text-body-md font-body-md mt-1">
                                        Pantau prioritas, catat instruksi dosen, dan selesaikan tugas sebelum tenggat waktu tiba.
                                    </p>
                                </div>
                                <div className="flex items-center gap-space-sm flex-shrink-0">
                                    <button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-lg shadow-primary-container/25 hover:bg-inverse-primary hover:shadow-primary-container/40 active:scale-95 transition-all">
                                        <span className="material-symbols-outlined text-[20px]">add_task</span>
                                        <span>Tambah Tugas Baru</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Statistik Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
                            {/* Total Tugas */}
                            <div className="relative overflow-hidden p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm shadow-md hover:shadow-primary-container/10 hover:-translate-y-0.5 transition-all group">
                                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Tugas</span>
                                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                                        <span className="material-symbols-outlined text-[20px]">layers</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-display font-display text-on-surface leading-none">{initialTasks.length}</span>
                                    <span className="text-body-sm font-body-sm text-outline">tugas terdaftar</span>
                                </div>
                            </div>

                            {/* Belum Selesai */}
                            <div className="relative overflow-hidden p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm shadow-md hover:shadow-secondary-container/10 hover:-translate-y-0.5 transition-all group">
                                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-secondary-container/15 rounded-full blur-xl group-hover:scale-125 transition-transform"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Belum Selesai</span>
                                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary-fixed-dim">
                                        <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-display font-display text-secondary-fixed leading-none">
                                        {initialTasks.filter(t => !t.completed).length}
                                    </span>
                                    <span className="text-body-sm font-body-sm text-outline">tugas mendesak</span>
                                </div>
                            </div>

                            {/* Selesai */}
                            <div className="relative overflow-hidden p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm shadow-md hover:shadow-tertiary/10 hover:-translate-y-0.5 transition-all group">
                                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-tertiary/15 rounded-full blur-xl group-hover:scale-125 transition-transform"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Selesai</span>
                                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
                                        <span className="material-symbols-outlined text-[20px]">task_alt</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-display font-display text-tertiary leading-none">
                                        {initialTasks.filter(t => t.completed).length}
                                    </span>
                                    <span className="text-body-sm font-body-sm text-outline">tugas tuntas</span>
                                </div>
                            </div>

                            {/* Mendekati Deadline */}
                            <div className="relative overflow-hidden p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm shadow-md hover:shadow-error/15 hover:-translate-y-0.5 transition-all group">
                                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-error/15 rounded-full blur-xl group-hover:scale-125 transition-transform"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Mendekati Deadline</span>
                                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-error">
                                        <span className="material-symbols-outlined text-[20px]">alarm</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-display font-display text-error leading-none">
                                        {initialTasks.filter(t => !t.completed && t.isUrgent).length}
                                    </span>
                                    <span className="text-body-sm font-body-sm text-outline">&lt; 48 jam lagi</span>
                                </div>
                            </div>
                        </div>

                        {/* Area Daftar Tugas (Sementara statis dulu, nanti kita buat dinamis) */}
                        <div className="w-full flex flex-col gap-3">
                            <div className="p-4 bg-surface-container-low rounded-xl text-center text-on-surface-variant">
                                Daftar tugas akan dirender di sini (Langkah selanjutnya).
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}