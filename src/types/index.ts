export type StatusTugas = 'Belum Selesai' | 'Selesai';
export type Priority = 'Tinggi' | 'Sedang' | 'Rendah';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  course: string;
  course_code: string;
  deadline: string;
  priority: Priority;
  is_completed: boolean;
  attachment: string | null;
  created_at?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  class_name: string;
  sks: number;
  room: string;
  day: string;
  time: string;
  lecturer: string;
  progress: number;
}