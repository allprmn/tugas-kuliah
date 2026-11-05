export type Priority = 'Tinggi' | 'Sedang' | 'Rendah';

export interface Task {
  id: string;
  title: string;
  description: string;
  course: string;
  courseCode: string;
  deadline: string;
  relativeTime: string;
  isUrgent: boolean;
  priority: Priority;
  attachment: string | null;
  completed: boolean;
}