import { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import LatticeLoader from '../components/ui/LatticeLoader';
import SpotlightCard from '../components/ui/SpotlightCard';
import { supabase } from '../lib/supabaseClient';
import type { Task } from '../types';

export default function JadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toLocaleDateString('en-CA')
  );

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentDate.getFullYear());
  const pickerRef = useRef<HTMLDivElement>(null);

  const todayStr = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('deadline', { ascending: true });

      if (data) setTasks(data);
      setIsLoading(false);
    };
    fetchData();

    window.addEventListener('tasksUpdated', fetchData);
    return () => window.removeEventListener('tasksUpdated', fetchData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleSelectMonth = (monthIndex: number) => {
    setCurrentDate(new Date(pickerYear, monthIndex, 1));
    setIsPickerOpen(false);
  };

  const changePickerYear = (delta: number) => setPickerYear(prev => prev + delta);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < startDayIndex; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, dateString });
    }
    return days;
  }, [currentDate]);

  const getTasksForDate = (dateString: string) => {
    return tasks.filter(task => task.deadline === dateString);
  };

  const isTaskInactive = (task: Task) => {
    return task.is_completed || task.deadline < todayStr;
  };

  const selectedTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter animate-page-transition">
          <div className="flex flex-col w-full pb-space-xl pt-6">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Jadwal & Kalender</h1>
                <p className="text-slate-500 mt-1 text-sm md:text-base">Pantau tenggat waktu tugas kuliahmu.</p>
              </div>

              {/* Tombol Pilih Bulan */}
              <div className="relative" ref={pickerRef}>
                <div className="flex items-center gap-1 sm:gap-4 bg-white/60 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-white/50 shadow-sm">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button
                    onClick={() => { setPickerYear(currentDate.getFullYear()); setIsPickerOpen(!isPickerOpen); }}
                    className="font-semibold text-slate-800 min-w-[120px] text-center flex items-center justify-center gap-1 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-100 text-sm"
                  >
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>
                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                {isPickerOpen && (
                  <div className="absolute top-full mt-2 right-0 z-50 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4 bg-slate-100 rounded-lg p-1">
                      <button onClick={() => changePickerYear(-1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-slate-600">
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      </button>
                      <span className="font-semibold text-slate-800">{pickerYear}</span>
                      <button onClick={() => changePickerYear(1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-slate-600">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {monthNames.map((month, idx) => (
                        <button
                          key={month}
                          onClick={() => handleSelectMonth(idx)}
                          className={`py-2 text-xs font-medium rounded-lg transition-colors ${idx === currentDate.getMonth() && pickerYear === currentDate.getFullYear()
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">

              {/* KALENDER KIRI */}
              <div className="xl:col-span-8 bg-white rounded-2xl p-3 sm:p-6 border border-slate-200 shadow-sm relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-2xl">
                    <div className="flex flex-col items-center justify-center py-32">
                      <LatticeLoader status="working" label="Memuat..." pattern="orbit" color="#2563eb" showTimer={false} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-7 mb-2 mt-1">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                    <div key={day} className="text-center font-semibold text-[10px] sm:text-xs text-slate-400 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {calendarDays.map((dayObj, index) => {
                    if (!dayObj) return <div key={`empty-${index}`} className="h-12 sm:h-20 md:h-24 rounded-lg sm:rounded-xl bg-slate-50/50"></div>;

                    const isSelected = selectedDate === dayObj.dateString;
                    const tasksOnDate = getTasksForDate(dayObj.dateString);

                    return (
      
                      <div
                        key={dayObj.dateString}
                        onClick={() => setSelectedDate(dayObj.dateString)}
                        className={`
                          h-12 sm:h-20 md:h-24 rounded-lg sm:rounded-xl p-1 flex flex-col items-center sm:items-start justify-between cursor-pointer border transition-all relative
                          ${isSelected
                            ? 'bg-blue-50 border-blue-400 shadow-sm'
                            : 'bg-white border-slate-100 hover:bg-slate-50'}
                        `}
                      >
                        <span className={`text-xs sm:text-sm font-semibold w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700'}`}>
                          {dayObj.day}
                        </span>

                        {tasksOnDate.length > 0 && (
                          <div className="flex gap-0.5 sm:gap-1 flex-wrap justify-center sm:justify-start w-full mt-auto">
                            {tasksOnDate.slice(0, 3).map((task, i) => (
                              <span
                                key={i}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isTaskInactive(task) ? 'bg-slate-300' : 'bg-red-500'}`}
                              ></span>
                            ))}
                            {tasksOnDate.length > 3 && <span className="text-[8px] text-slate-400">+</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PANEL KANAN (AGENDA & KETERANGAN) */}
              <div className="xl:col-span-4 flex flex-col gap-4">
                <SpotlightCard
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm overflow-hidden"
                  theme="light"
                  spotlightColor="rgba(125, 211, 252, 0.4)"
                  intensity={0.3}>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Pilih Tanggal'}
                    </h2>
                    <span className="material-symbols-outlined text-slate-400">event_note</span>
                  </div>

                  {selectedTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                      <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">free_cancellation</span>
                      <p className="text-slate-500 text-sm">Tidak ada deadline di tanggal ini.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 relative z-10">
                      {selectedTasks.map(task => (
                        <div key={task.id} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isTaskInactive(task) ? 'bg-slate-200 text-slate-500' : 'bg-red-100 text-red-600'}`}>
                              {task.course_code}
                            </span>
                            <span className={`text-xs font-semibold flex items-center gap-1 ${isTaskInactive(task) ? 'text-slate-400' : 'text-slate-600'}`}>
                              <span className="material-symbols-outlined text-[14px]">schedule</span> 23:59
                            </span>
                          </div>
                          <h3 className={`text-sm font-semibold ${isTaskInactive(task) ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                            {task.title}
                          </h3>
                          <p className={`text-xs mt-1 font-medium ${isTaskInactive(task) ? 'text-slate-400' : 'text-red-500'}`}>
                            Status: {task.is_completed ? 'Selesai' : (task.deadline < todayStr ? 'Terlewat' : 'Mendesak')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </SpotlightCard>

                <SpotlightCard 
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm"
                  theme="light"
                  spotlightColor="rgba(125, 211, 252, 0.4)"
                  intensity={0.3}>
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm relative z-10">Keterangan</h3>
                  <div className="flex flex-col gap-2 text-xs text-slate-600 relative z-10">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Deadline Aktif</div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Selesai / Terlewat</div>
                  </div>
                </SpotlightCard>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}