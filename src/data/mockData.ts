import type { Task } from '../types';

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Tugas 3: ERD & Normalisasi Basis Data",
    description: "Menyusun skema 3NF sistem e-commerce multitenant lengkap dengan visualisasi Chen ERD dan kamus data.",
    course: "Sistem Basis Data",
    courseCode: "IF-301",
    deadline: "2025-05-15",
    relativeTime: "Besok, 23:59 WIB",
    isUrgent: true,
    priority: "Tinggi",
    attachment: "Modul_Normalisasi_v3.pdf",
    completed: false
  },
  {
    id: "task-2",
    title: "Project Akhir: Fullstack React & Tailwind",
    description: "Membangun dashboard analitik perkuliahan responsif dengan RESTful API integration dan state management.",
    course: "Pemrograman Web II",
    courseCode: "IF-202",
    deadline: "2025-05-18",
    relativeTime: "3 hari lagi",
    isUrgent: true,
    priority: "Tinggi",
    attachment: "GitHub: /nadia-larasati/study-flow",
    completed: false
  },
  // ... (Copy sisa data task-3 sampai task-12 dari HTML kamu ke sini)
];