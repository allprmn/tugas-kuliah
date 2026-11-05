import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseAdded: () => void;
}

export default function CourseModal({ isOpen, onClose, onCourseAdded }: CourseModalProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('A');
  const [sks, setSks] = useState(3);
  const [room, setRoom] = useState('');
  const [day, setDay] = useState('Senin');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:30');
  const [lecturer, setLecturer] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('courses').insert([
      {
        code,
        name,
        class_name: className,
        sks: Number(sks),
        room,
        day,
        time: `${startTime} s/d ${endTime}`,
        lecturer,
      }
    ]);

    setLoading(false);

    if (error) {
      alert('Gagal menambah mata kuliah: ' + error.message);
    } else {
      onCourseAdded();
      onClose();
      // Reset form
      setCode(''); setName(''); setRoom(''); setLecturer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-surface-container-low shadow-2xl p-6 border border-outline-variant/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-on-surface">Tambah Mata Kuliah</h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Kode MK</label>
              <input required type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" placeholder="20100..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Nama Mata Kuliah</label>
              <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" placeholder="Pemrograman Web..." />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Kelas</label>
              <input required type="text" value={className} onChange={(e) => setClassName(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">SKS</label>
              <select value={sks} onChange={(e) => setSks(Number(e.target.value))} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Ruang</label>
              <input required type="text" value={room} onChange={(e) => setRoom(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" placeholder="R.4.01" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Hari</label>
              <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Jam Mulai</label>
              <input required type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Jam Selesai</label>
              <input required type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary [color-scheme:dark]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Dosen Pengampu</label>
            <input required type="text" value={lecturer} onChange={(e) => setLecturer(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" placeholder="Nama lengkap beserta gelar..." />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Mata Kuliah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}