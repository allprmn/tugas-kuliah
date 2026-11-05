import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import CourseCard from '../components/cards/CourseCard';
import CourseModal from '../components/CourseModal';
import { initialCourses } from '../data/courseData';

export default function MataKuliahPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Ubah initialCourses menjadi state
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk Modal

    // Fungsi untuk menangani data dari Modal
    const handleSaveCourse = (newCourse: Course) => {
        setCourses([...courses, newCourse]); // Tambahkan ke list
        setIsModalOpen(false); // Tutup modal
    };

    // Logika Filter
    const countAll = courses.length;
    const countUncompleted = courses.filter(c => c.progress < 100).length;
    const countCompleted = courses.filter(c => c.progress === 100).length;

    // Logika Filter
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesTab = true;
        if (activeFilter === 'uncompleted') matchesTab = course.progress < 100;
        if (activeFilter === 'completed') matchesTab = course.progress === 100;

        return matchesSearch && matchesTab;
    });

    return (
        <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
                <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="relative w-full pt-16 bg-background min-h-screen px-gutter">
                    <div className="flex flex-col w-full pb-space-xl pt-6">

                        {/* Header Title */}
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-space-xs mb-space-xs">
                                    <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                        Semester Ganjil 2024/2025
                                    </span>
                                    <span className="font-label-sm text-label-sm text-outline">•</span>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Program Studi Teknik Informatika</span>
                                </div>
                                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                                    Daftar Mata Kuliah Semester 5
                                </h1>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                                    Kelola mata kuliah, dosen pengampu, bobot SKS, ruang kelas, dan pantau progres tugas secara real-time.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-space-sm">
                                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container hover:bg-blue-600 text-on-primary-container font-label-lg text-label-lg font-semibold shadow-md shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                    <span>+ Tambah Mata Kuliah</span>
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mb-space-xl">
                            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">menu_book</span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Total Mata Kuliah</span>
                                    <div className="flex items-baseline gap-1.5 mt-0.5">
                                        <span className="font-headline-md text-headline-md text-on-surface font-semibold">{initialCourses.length}</span>
                                        <span className="font-label-sm text-label-sm text-outline">Kelas</span>
                                    </div>
                                </div>
                            </div>
                            {/* Tambahkan 3 stat lainnya persis seperti desain HTML */}
                            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">credit_card</span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Beban SKS</span>
                                    <div className="flex items-baseline gap-1.5 mt-0.5">
                                        <span className="font-headline-md text-headline-md text-on-surface font-semibold">20</span>
                                        <span className="font-label-sm text-label-sm text-outline">SKS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">task_alt</span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Rata-rata Selesai</span>
                                    <div className="flex items-baseline gap-1.5 mt-0.5">
                                        <span className="font-headline-md text-headline-md text-tertiary font-semibold">88%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-space-md">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">record_voice_over</span>
                                </div>
                                <div>
                                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Dosen Pengampu</span>
                                    <div className="flex items-baseline gap-1.5 mt-0.5">
                                        <span className="font-headline-md text-headline-md text-on-surface font-semibold">6</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md mb-space-lg">
                            <div className="relative flex-1 max-w-md">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                                <input
                                    className="w-full h-11 pl-10 pr-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container transition-all"
                                    placeholder="Cari nama mata kuliah, kode, atau nama dosen..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low overflow-x-auto">
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`px-space-md py-1.5 rounded-lg text-label-sm transition-all whitespace-nowrap ${activeFilter === 'all' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                                >
                                    Semua ({countAll})
                                </button>
                                <button
                                    onClick={() => setActiveFilter('uncompleted')}
                                    className={`px-space-md py-1.5 rounded-lg text-label-sm transition-all whitespace-nowrap ${activeFilter === 'uncompleted' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                                >
                                    Ada Tugas ({countUncompleted})
                                </button>
                                <button
                                    onClick={() => setActiveFilter('completed')}
                                    className={`px-space-md py-1.5 rounded-lg text-label-sm transition-all whitespace-nowrap ${activeFilter === 'completed' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                                >
                                    Tidak Ada Tugas ({countCompleted})
                                </button>
                            </div>
                        </div>

                        {/* Grid Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                            {[...filteredCourses]
                                .sort((a, b) => {
                                    if (a.progress === 100 && b.progress !== 100) return 1;

                                    if (a.progress !== 100 && b.progress === 100) return -1;

                                    return b.progress - a.progress;
                                })
                                .map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>

                        {/* Empty State jika tidak ada hasil */}
                        {filteredCourses.length === 0 && (
                            <div className="w-full text-center py-20 bg-surface-container-low rounded-2xl mt-4">
                                <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
                                <h3 className="text-headline-sm font-semibold text-on-surface">Mata Kuliah Tidak Ditemukan</h3>
                                <p className="text-on-surface-variant mt-2">Coba gunakan kata kunci lain atau ubah filter.</p>
                            </div>
                        )}

                    </div>
                </main>
            </div>
            <CourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCourse}
            />
        </div>
    );
}