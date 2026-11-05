export interface Course {
  id: string;
  code: string;
  name: string;
  sks: number;
  status: 'urgent' | 'track' | 'done' | 'regular';
  statusText: string;
  schedule: string;
  room: string;
  lecturer: string;
  lecturerImg: string;
  progress: number;
  tasksCompleted: string;
  activeTasks: number;
  tags: string[];
  colorTheme: 'primary' | 'secondary' | 'tertiary' | 'purple';
}

export const initialCourses: Course[] = [
  {
    id: '1', code: 'IF-301', name: 'Sistem Basis Data', sks: 3, status: 'urgent', statusText: '1 Mendesak',
    schedule: 'Senin, 08:00 - 10:30 WIB', room: 'Lab Komputer 2 (Gedung D, Lt. 3)',
    lecturer: 'Dr. Ir. Budi Santoso, M.Kom', lecturerImg: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=2563eb&color=fff',
    progress: 75, tasksCompleted: '6/8 Tugas', activeTasks: 4, tags: ['lab', 'urgent'], colorTheme: 'primary'
  },
  {
    id: '2', code: 'IF-202', name: 'Pemrograman Web II', sks: 3, status: 'urgent', statusText: '1 Mendesak',
    schedule: 'Selasa, 13:00 - 15:30 WIB', room: 'Ruang Teori R.304 (Gedung B)',
    lecturer: 'Siti Rahmawati, M.T', lecturerImg: 'https://ui-avatars.com/api/?name=Siti+Rahmawati&background=3198dc&color=fff',
    progress: 60, tasksCompleted: '3/5 Tugas', activeTasks: 3, tags: ['urgent'], colorTheme: 'secondary'
  },
  {
    id: '3', code: 'IF-404', name: 'Kecerdasan Buatan', sks: 4, status: 'track', statusText: 'On Track',
    schedule: 'Rabu, 09:30 - 12:00 WIB', room: 'Lab AI & Data Science (Gedung Riset)',
    lecturer: 'Prof. Hendra Wijaya, Ph.D', lecturerImg: 'https://ui-avatars.com/api/?name=Hendra+Wijaya&background=4edea3&color=fff',
    progress: 85, tasksCompleted: '6/7 Tugas', activeTasks: 2, tags: ['lab'], colorTheme: 'tertiary'
  },
  {
    id: '4', code: 'IF-310', name: 'Metode Riset & Penulisan Ilmiah', sks: 2, status: 'regular', statusText: 'Reguler',
    schedule: 'Kamis, 10:00 - 11:40 WIB', room: 'Ruang R.201 (Gedung Pascasarjana)',
    lecturer: 'Dr. Maya Anggraini', lecturerImg: 'https://ui-avatars.com/api/?name=Maya+Anggraini&background=9333ea&color=fff',
    progress: 70, tasksCompleted: '4/6 Bab', activeTasks: 2, tags: [], colorTheme: 'purple'
  },
  {
    id: '5', code: 'IF-305', name: 'Jaringan Komputer Lanjut', sks: 3, status: 'track', statusText: 'Hampir Tuntas',
    schedule: 'Jumat, 08:00 - 10:30 WIB', room: 'Lab Jaringan & Infrastruktur (Gedung C)',
    lecturer: 'Agus Pratama, M.Cs', lecturerImg: 'https://ui-avatars.com/api/?name=Agus+Pratama&background=2563eb&color=fff',
    progress: 90, tasksCompleted: '9/10 Tugas', activeTasks: 1, tags: ['lab'], colorTheme: 'primary'
  },
  {
    id: '6', code: 'IF-108', name: 'Etika Profesi & Kewirausahaan', sks: 2, status: 'done', statusText: 'Selesai Sempurna',
    schedule: 'Rabu, 14:00 - 15:40 WIB', room: 'Ruang R.102 (Gedung A, Lt. 1)',
    lecturer: 'Dian Kurnia, M.M', lecturerImg: 'https://ui-avatars.com/api/?name=Dian+Kurnia&background=4edea3&color=fff',
    progress: 100, tasksCompleted: '5/5 Tugas', activeTasks: 0, tags: [], colorTheme: 'tertiary'
  }
];