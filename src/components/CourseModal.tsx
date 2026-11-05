import React, { useState } from 'react';
import type { Course } from '../data/courseData';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCourse: Course) => void;
}

export default function CourseModal({ isOpen, onClose, onSave }: CourseModalProps) {
  // State untuk menampung isian form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [sks, setSks] = useState(3);
  const [room, setRoom] = useState('');
  const [lecturer, setLecturer] = useState('');
  
  // State untuk Jadwal (Dipecah agar rapi)
  const [day, setDay] = useState('Senin');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:30');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gabungkan hari, jam mulai, dan jam selesai menjadi satu string
    const formattedSchedule = `${day}, ${startTime} - ${endTime} WIB`;

    const newCourse: Course = {
      id: Date.now().toString(),
      name: name || 'Mata Kuliah Baru',
      code: code || 'IF-000',
      sks: Number(sks),
      status: 'regular',
      statusText: 'Reguler',
      schedule: formattedSchedule,
      room: room || 'Belum ditentukan',
      lecturer: lecturer || 'Belum ada dosen',
      lecturerImg: `https://ui-avatars.com/api/?name=${lecturer || 'Dosen'}&background=random&color=fff`,
      progress: 0,
      tasksCompleted: '0/0 Tugas',
      activeTasks: 0,
      tags: [],
      colorTheme: 'primary',
    };

    onSave(newCourse);
    
    // Reset form
    setName('');
    setCode('');
    setSks(3);
    setRoom('');
    setLecturer('');
    setDay('Senin');
    setStartTime('08:00');
    setEndTime('10:30');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-4">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-surface-container-low shadow-2xl p-space-lg max-h-[921px] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-space-sm mb-space-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Tambah Mata Kuliah Baru</h3>
            <p className="font-body-sm text-body-sm text-outline">Masukkan detail mata kuliah untuk semester aktif.</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          {/* Baris 1: Nama & Kode MK */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="sm:col-span-2">
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Nama Mata Kuliah</label>
              <input 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container" 
                placeholder="Contoh: Pemrograman Mobile" 
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Kode MK</label>
              <input 
                required
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container" 
                placeholder="IF-309" 
              />
            </div>
          </div>

          {/* Baris 2: SKS & Ruangan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Bobot SKS</label>
              <select 
                value={sks}
                onChange={(e) => setSks(Number(e.target.value))}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="1">1 SKS</option>
                <option value="2">2 SKS</option>
                <option value="3">3 SKS</option>
                <option value="4">4 SKS</option>
                <option value="6">6 SKS</option>
              </select>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Ruang / Lokasi Kelas</label>
              <input 
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container" 
                placeholder="Lab Software / R.301" 
              />
            </div>
          </div>

          {/* Baris 3: Dosen */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Dosen Pengampu & Gelar</label>
            <input 
              type="text"
              value={lecturer}
              onChange={(e) => setLecturer(e.target.value)}
              className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container" 
              placeholder="Contoh: Dr. Eko Wahyudi, S.T., M.T." 
            />
          </div>

          {/* Baris 4: Jadwal (Hari, Jam Mulai, Jam Selesai) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Hari</label>
              <select 
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer"
              >
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
              </select>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Jam Mulai</label>
              <input 
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer [color-scheme:dark]" 
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1">Jam Selesai</label>
              <input 
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-10 px-space-sm rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer [color-scheme:dark]" 
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-sm mt-space-xs">
            <button 
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-space-md py-2 rounded-lg bg-primary-container hover:bg-blue-600 text-on-primary-container font-label-md text-label-md font-semibold transition-colors"
            >
              Simpan Mata Kuliah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}