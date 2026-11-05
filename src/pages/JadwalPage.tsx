import React, { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { initialSchedules } from '../data/scheduleData';

export default function JadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [selectedDate, setSelectedDate] = useState<string | null>('2024-11-12');

  // State untuk Pop-up Pilih Bulan/Tahun
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentDate.getFullYear());
  const pickerRef = useRef<HTMLDivElement>(null);

  // Tutup pop-up jika klik di luar area
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

  // Fungsi saat bulan dipilih dari pop-up
  const handleSelectMonth = (monthIndex: number) => {
    setCurrentDate(new Date(pickerYear, monthIndex, 1));
    setIsPickerOpen(false);
  };

  // Fungsi navigasi tahun di dalam pop-up
  const changePickerYear = (delta: number) => {
    setPickerYear(prev => prev + delta);
  };

  // Logika Grid Kalender
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

  const selectedEvents = initialSchedules.filter(event => event.date === selectedDate);

  const hasEvent = (dateString: string) => initialSchedules.some(event => event.date === dateString);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Jadwal & Kalender (Versi Fitur)</h1>
                <p className="text-on-surface-variant mt-1">Pantau jadwal kuliah dan tenggat waktu tugasmu.</p>
              </div>
              
              {/* ==== KONTROL BULAN & TAHUN (UPDATED) ==== */}
              <div className="relative" ref={pickerRef}>
                <div className="flex items-center gap-4 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20 shadow-sm">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  
                  {/* Tombol Pembuka Pop-up */}
                  <button 
                    onClick={() => {
                      setPickerYear(currentDate.getFullYear());
                      setIsPickerOpen(!isPickerOpen);
                    }}
                    className="font-semibold text-on-surface min-w-[140px] text-center flex items-center justify-center gap-1 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-surface-container-high"
                  >
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>

                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                {/* Dropdown Pilih Bulan & Tahun */}
                {isPickerOpen && (
                  <div className="absolute top-full mt-2 right-0 z-50 w-72 bg-surface-container-low rounded-xl shadow-xl border border-outline-variant/20 p-4 animate-in fade-in zoom-in-95 duration-200">
                    {/* Navigasi Tahun */}
                    <div className="flex items-center justify-between mb-4 bg-surface-container rounded-lg p-1">
                      <button onClick={() => changePickerYear(-1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      </button>
                      <span className="font-semibold text-on-surface">{pickerYear}</span>
                      <button onClick={() => changePickerYear(1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>

                    {/* Grid Bulan */}
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
              {/* ==== END KONTROL BULAN & TAHUN ==== */}

            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
              {/* KIRI: Kalender */}
              <div className="xl:col-span-8 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
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
                    const dateHasEvent = hasEvent(dayObj.dateString);

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
                        
                        {dateHasEvent && (
                          <div className="mt-auto flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-error"></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KANAN: Agenda */}
              <div className="xl:col-span-4 flex flex-col gap-4">
                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-on-surface">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Pilih Tanggal'}
                    </h2>
                    <span className="material-symbols-outlined text-outline">event_note</span>
                  </div>

                  {selectedEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                      <span className="material-symbols-outlined text-4xl mb-2">free_cancellation</span>
                      <p className="text-on-surface-variant">Tidak ada agenda di tanggal ini.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedEvents.map(event => (
                        <div key={event.id} className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              event.type === 'deadline' ? 'bg-error-container text-error' :
                              event.type === 'quiz' ? 'bg-tertiary-container text-tertiary' :
                              'bg-secondary-container text-secondary'
                            }`}>
                              {event.course}
                            </span>
                            <span className="text-sm font-semibold text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              {event.time}
                            </span>
                          </div>
                          <h3 className="font-semibold text-on-surface">{event.title}</h3>
                          <p className="text-sm text-outline capitalize mt-1">Tipe: {event.type === 'class' ? 'Kuliah' : event.type}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
                  <h3 className="font-semibold text-on-surface mb-4">Keterangan</h3>
                  <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-error"></span> Deadline Tugas</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-tertiary"></span> Kuis / Ujian</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-secondary"></span> Jadwal Kuliah</div>
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