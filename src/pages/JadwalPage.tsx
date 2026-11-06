import React, { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
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
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Jadwal & Kalender</h1>
                <p className="text-on-surface-variant mt-1">Pantau tenggat waktu tugas kuliahmu.</p>
              </div>
              
              <div className="relative" ref={pickerRef}>
                <div className="flex items-center gap-4 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20 shadow-sm">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  
                  <button 
                    onClick={() => { setPickerYear(currentDate.getFullYear()); setIsPickerOpen(!isPickerOpen); }}
                    className="font-semibold text-on-surface min-w-[140px] text-center flex items-center justify-center gap-1 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-surface-container-high"
                  >
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>

                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                {isPickerOpen && (
                  <div className="absolute top-full mt-2 right-0 z-50 w-72 bg-surface-container-low rounded-xl shadow-xl border border-outline-variant/20 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4 bg-surface-container rounded-lg p-1">
                      <button onClick={() => changePickerYear(-1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      </button>
                      <span className="font-semibold text-on-surface">{pickerYear}</span>
                      <button onClick={() => changePickerYear(1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {monthNames.map((month, idx) => (
                        <button
                          key={month}
                          onClick={() => handleSelectMonth(idx)}
                          className={`py-2 text-sm font-medium rounded-lg transition-colors ${
                            idx === currentDate.getMonth() && pickerYear === currentDate.getFullYear()
                              ? 'bg-primary text-on-primary shadow-md'
                              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
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
              
              <div className="xl:col-span-8 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-surface-container-low/80 z-10 flex items-center justify-center rounded-2xl">
                    <span className="text-on-surface-variant">Memuat data kalender...</span>
                  </div>
                )}
                
                <div className="grid grid-cols-7 mb-2">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                    <div key={day} className="text-center font-semibold text-sm text-on-surface-variant py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((dayObj, index) => {
                    if (!dayObj) return <div key={`empty-${index}`} className="h-24 rounded-xl bg-surface-container-lowest/30"></div>;
                    
                    const isSelected = selectedDate === dayObj.dateString;
                    const tasksOnDate = getTasksForDate(dayObj.dateString);

                    return (
                      <div 
                        key={dayObj.dateString}
                        onClick={() => setSelectedDate(dayObj.dateString)}
                        className={`
                          h-24 rounded-xl p-2 flex flex-col cursor-pointer border transition-all relative
                          ${isSelected 
                            ? 'bg-primary-container/10 border-primary/50' 
                            : 'bg-surface-container-lowest/30 border-transparent hover:bg-surface-container-highest/40'}
                        `}
                      >
                        <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1 ${isSelected ? 'bg-primary text-on-primary' : 'text-on-surface'}`}>
                          {dayObj.day}
                        </span>
                        
                        {tasksOnDate.length > 0 && (
                          <div className="mt-auto flex gap-1 flex-wrap">
                            {tasksOnDate.slice(0, 3).map((task, i) => (
                              <span 
                                key={i} 
                                className={`w-2 h-2 rounded-full ${
                                  isTaskInactive(task) ? 'bg-outline/50' : 'bg-error'
                                }`}
                              ></span>
                            ))}
                            {tasksOnDate.length > 3 && <span className="text-[10px] text-outline">+</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="xl:col-span-4 flex flex-col gap-4">
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-on-surface">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Pilih Tanggal'}
                    </h2>
                    <span className="material-symbols-outlined text-outline">event_note</span>
                  </div>

                  {selectedTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                      <span className="material-symbols-outlined text-4xl mb-2">free_cancellation</span>
                      <p className="text-on-surface-variant">Tidak ada deadline tugas di tanggal ini.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedTasks.map(task => (
                        <div key={task.id} className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              isTaskInactive(task) ? 'bg-surface-container-high text-outline' : 'bg-error-container text-error'
                            }`}>
                              {task.course_code}
                            </span>
                            <span className={`text-sm font-semibold flex items-center gap-1 ${
                              isTaskInactive(task) ? 'text-outline' : 'text-on-surface-variant'
                            }`}>
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              23:59
                            </span>
                          </div>
                          <h3 className={`font-semibold ${isTaskInactive(task) ? 'text-outline line-through' : 'text-on-surface'}`}>
                            {task.title}
                          </h3>
                          <p className={`text-sm mt-1 capitalize font-medium ${
                            isTaskInactive(task) ? 'text-outline' : 'text-error'
                          }`}>
                            Status: {task.is_completed ? 'Selesai' : (task.deadline < todayStr ? 'Terlewat' : 'Mendesak')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
                  <h3 className="font-semibold text-on-surface mb-4">Keterangan</h3>
                  <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-error"></span> Deadline Aktif (Belum Selesai)</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-outline/50"></span> Deadline Selesai / Terlewat</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}