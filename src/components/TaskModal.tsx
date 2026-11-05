import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Task, Course } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  taskToEdit?: Task | null; // Tambahan prop untuk edit
}

export default function TaskModal({ isOpen, onClose, onTaskAdded, taskToEdit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Sedang');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State untuk data mata kuliah
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  // Ambil data mata kuliah untuk dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*').order('name');
      if (data) {
        setCoursesList(data);
        // Jika sedang tambah baru dan dropdown kosong, pilih yang pertama
        if (!taskToEdit && data.length > 0) {
          setCourse(data[0].name);
          setCourseCode(data[0].code);
        }
      }
    };
    if (isOpen) fetchCourses();
  }, [isOpen, taskToEdit]);

  // Isi form jika mode edit
  useEffect(() => {
    if (taskToEdit && isOpen) {
      setTitle(taskToEdit.title);
      setCourse(taskToEdit.course);
      setCourseCode(taskToEdit.course_code);
      setDeadline(taskToEdit.deadline);
      setPriority(taskToEdit.priority);
      setDescription(taskToEdit.description || '');
    } else if (isOpen && !taskToEdit) {
      // Reset form jika mode tambah
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('Sedang');
    }
  }, [taskToEdit, isOpen]);

  // Handler saat dropdown mata kuliah berubah
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const selectedCourse = coursesList.find(c => c.code === selectedCode);
    if (selectedCourse) {
      setCourse(selectedCourse.name);
      setCourseCode(selectedCourse.code);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title,
      course,
      course_code: courseCode,
      deadline: deadline || new Date().toISOString().split('T')[0],
      priority,
      description: description || null,
    };

    let error;
    
    if (taskToEdit) {
      // Mode Edit (Update)
      const { error: updateError } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', taskToEdit.id);
      error = updateError;
    } else {
      // Mode Tambah (Insert)
      const { error: insertError } = await supabase
        .from('tasks')
        .insert([{ ...taskData, is_completed: false }]);
      error = insertError;
    }

    setLoading(false);

    if (error) {
      alert('Gagal menyimpan tugas: ' + error.message);
    } else {
      onTaskAdded();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-low shadow-2xl p-6 border border-outline-variant/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-on-surface">
            {taskToEdit ? 'Edit Tugas' : 'Tambah Tugas Baru'}
          </h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Judul Tugas</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary" placeholder="Contoh: Tugas 1 Basis Data" />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Mata Kuliah</label>
            {coursesList.length === 0 ? (
              <div className="text-sm text-error p-2 bg-error/10 rounded-lg">Belum ada mata kuliah di database. Silakan tambah Mata Kuliah terlebih dahulu.</div>
            ) : (
              <select 
                required 
                value={courseCode} 
                onChange={handleCourseChange} 
                className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary"
              >
                {coursesList.map(c => (
                  <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Deadline</label>
              <input required type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Prioritas</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary">
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Deskripsi (Opsional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary resize-none" placeholder="Instruksi dosen..." />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">Batal</button>
            <button type="submit" disabled={loading || coursesList.length === 0} className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}