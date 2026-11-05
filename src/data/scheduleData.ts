export interface ScheduleEvent {
  id: string;
  date: string; // format YYYY-MM-DD
  time: string;
  title: string;
  course: string;
  type: 'deadline' | 'quiz' | 'class';
}

export const initialSchedules: ScheduleEvent[] = [
  { id: '1', date: '2024-11-11', time: '08:00', title: 'Kuliah: Basis Data', course: 'IF-301', type: 'class' },
  { id: '2', date: '2024-11-12', time: '09:30', title: 'Kuliah: AI & ML', course: 'IF-404', type: 'class' },
  { id: '3', date: '2024-11-12', time: '23:59', title: 'Tugas 3: ERD Basis Data', course: 'IF-301', type: 'deadline' },
  { id: '4', date: '2024-11-14', time: '10:00', title: 'Kuis 2: Machine Learning', course: 'IF-404', type: 'quiz' },
  { id: '5', date: '2024-11-15', time: '23:59', title: 'Project Akhir React', course: 'IF-202', type: 'deadline' },
  { id: '6', date: '2024-11-20', time: '13:00', title: 'Kuliah: Pemrograman Web', course: 'IF-202', type: 'class' },
  { id: '7', date: '2024-11-25', time: '23:59', title: 'Laporan Praktikum AI', course: 'IF-404', type: 'deadline' },
];