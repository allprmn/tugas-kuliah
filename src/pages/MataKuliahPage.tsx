import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import CourseModal from '../components/CourseModal';
import LatticeLoader from '../components/ui/LatticeLoader';
import { supabase } from '../lib/supabaseClient';
import type { Course } from '../types';

// Interface baru untuk menampung data mata kuliah + hasil hitung tugas
interface CourseWithStats extends Course {
  totalTasks: number;
  completedTasks: number;
  calculatedProgress: number;
  hasTasks: boolean;
}

export default function MataKuliahPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [courses, setCourses] = useState<CourseWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'has_tasks' | 'no_tasks'>('all');

  // Fetch Data (Courses & Tasks)
  const fetchData = async () => {
    setIsLoading(true);

    // Ambil data dari dua tabel secara bersamaan
    const [coursesRes, tasksRes] = await Promise.all([
      supabase.from('courses').select('*').order('created_at', { ascending: true }),
      supabase.from('tasks').select('*')
    ]);

    if (coursesRes.data && tasksRes.data) {
      const allTasks = tasksRes.data;

      // Gabungkan data courses dengan kalkulasi dari tasks
      const coursesWithStats = coursesRes.data.map((course) => {
        // Cari tugas yang kode mata kuliahnya cocok
        const courseTasks = allTasks.filter(
          (t) => t.course_code === course.code || t.course === course.name
        );

        const totalTasks = courseTasks.length;
        const completedTasks = courseTasks.filter((t) => t.is_completed).length;

        // Hitung persentase (hindari pembagian dengan nol)
        const calculatedProgress = totalTasks > 0
          ? Math.round((completedTasks / totalTasks) * 100)
          : 0;

        return {
          ...course,
          totalTasks,
          completedTasks,
          calculatedProgress,
          hasTasks: totalTasks > 0,
        };
      });

      setCourses(coursesWithStats);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus mata kuliah ini?')) {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  // --- LOGIKA STATISTIK ---
  const totalKelas = courses.length;
  const totalSKS = courses.reduce((sum, course) => sum + course.sks, 0);
  const totalDosen = new Set(courses.map(c => c.lecturer)).size;

  // Rata-rata progress dihitung dari calculatedProgress
  const rataRataProgress = totalKelas > 0
    ? Math.round(courses.reduce((sum, course) => sum + course.calculatedProgress, 0) / totalKelas)
    : 0;

  // --- LOGIKA FILTER & SEARCH ---
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      (course.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.code || '').toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === 'has_tasks') matchesTab = course.hasTasks;
    if (activeTab === 'no_tasks') matchesTab = !course.hasTasks;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter animate-page-transition">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-7xl mx-auto">

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Tambah Mata Kuliah
              </button>
            </div>

            {/* 1. BAGIAN STATISTIK */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-surface-container-low rounded-xl p-3 sm:p-5 border border-outline-variant/10 flex items-center gap-2.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[24px]">menu_book</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-outline uppercase tracking-wider font-semibold truncate">Kuliah</p>
                  <p className="text-lg sm:text-2xl font-bold text-black">{totalKelas} <span className="text-xs sm:text-sm font-normal text-outline">Kelas</span></p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 sm:p-5 border border-outline-variant/10 flex items-center gap-2.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[24px]">credit_card</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-outline uppercase tracking-wider font-semibold truncate">Beban SKS</p>
                  <p className="text-lg sm:text-2xl font-bold text-black">{totalSKS} <span className="text-xs sm:text-sm font-normal text-outline">SKS</span></p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 sm:p-5 border border-outline-variant/10 flex items-center gap-2.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[24px]">task_alt</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-outline uppercase tracking-wider font-semibold truncate">Selesai</p>
                  <p className="text-lg sm:text-2xl font-bold text-emerald-400">{rataRataProgress}%</p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 sm:p-5 border border-outline-variant/10 flex items-center gap-2.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[24px]">record_voice_over</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-outline uppercase tracking-wider font-semibold truncate">Dosen Pengampu</p>
                  <p className="text-lg sm:text-2xl font-bold text-black">{totalDosen}</p>
                </div>
              </div>
            </div>

            {/* 2. BAGIAN SEARCH & TAB FILTER */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">

              <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/10 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-on-surface-variant hover:text-black'}`}
                >
                  Semua ({courses.length})
                </button>
                <button
                  onClick={() => setActiveTab('has_tasks')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'has_tasks' ? 'bg-blue-600 text-white' : 'text-on-surface-variant hover:text-black'}`}
                >
                  Ada Tugas ({courses.filter(c => c.hasTasks).length})
                </button>
                <button
                  onClick={() => setActiveTab('no_tasks')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'no_tasks' ? 'bg-blue-600 text-white' : 'text-on-surface-variant hover:text-black'}`}
                >
                  Tidak Ada Tugas ({courses.filter(c => !c.hasTasks).length})
                </button>
              </div>
            </div>

            {/* 3. BAGIAN GRID CARD MATA KULIAH */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <LatticeLoader
                  status="working"
                  label="Memuat Mata Kuliah..."
                  pattern="orbit"
                  color="#dae2fd"
                  showTimer={false}
                />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-5xl text-outline mb-3">search_off</span>
                <h3 className="text-lg font-semibold text-on-surface">Mata kuliah tidak ditemukan</h3>
                <p className="text-on-surface-variant text-sm mt-1">Coba ubah kata kunci atau filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="relative bg-surface-container-low rounded-2xl p-3.5 sm:p-6 border border-outline-variant/10 shadow-sm hover:border-primary/30 transition-all group flex flex-col h-full"
                  >

                    <button
                      onClick={() => handleDelete(course.id)}
                      className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-outline opacity-0 group-hover:opacity-100 hover:bg-error/10 hover:text-error transition-all z-10"
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">delete</span>
                    </button>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2.5 sm:mb-4">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Teknik Informatika
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Semester 5
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-xl font-bold text-black mb-1 sm:mb-2 leading-snug sm:leading-tight line-clamp-2">
                      {course.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mb-0.5 sm:mb-1 truncate">Kode: {course.code}</p>
                    <p className="text-xs sm:text-sm text-slate-700 mb-2.5 sm:mb-4 truncate">Kelas: {course.class_name}</p>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[15px] sm:text-[18px] shrink-0">person</span>
                      <span className="truncate">{course.lecturer}</span>
                    </div>

                    {/* Progress Bar Dinamis */}
                    <div className="mt-auto pt-4 sm:pt-8">
                      <div className="flex items-end justify-between mb-2 sm:mb-3">
                        <span className="text-xl sm:text-3xl font-bold text-black block">
                          {course.calculatedProgress}%
                        </span>
                        <span className="text-[10px] sm:text-xs text-outline mb-0.5 sm:mb-1">
                          {course.hasTasks
                            ? `${course.completedTasks}/${course.totalTasks} Tugas`
                            : 'Belum ada tugas'}
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 sm:h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${course.calculatedProgress}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>

      <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCourseAdded={fetchData} />
    </div>
  );
}