export interface ArchivedTask {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  completedDate: string;
  grade: string;
  score: number;
  feedback: string;
  fileName: string;
  fileType: 'zip' | 'pdf' | 'xlsx' | 'png' | 'link';
}

export const initialArchives: ArchivedTask[] = [
  {
    id: 'arc-1', title: 'Praktikum 04: Stateful & Stateless React Component',
    course: 'Pemrograman Web II', courseCode: 'IF-202', completedDate: '10 Mei 2024',
    grade: 'A', score: 95, feedback: 'Arsitektur kode bersih', fileName: 'Tugas4_NadiaLarasati.zip', fileType: 'zip'
  },
  {
    id: 'arc-2', title: 'Kuis 1: Logika Proposisi & First Order Logic',
    course: 'Kecerdasan Buatan', courseCode: 'IF-404', completedDate: '8 Mei 2024',
    grade: 'A', score: 90, feedback: 'Analisis sangat rapi', fileName: 'Kuis1_Logika_FOL.pdf', fileType: 'pdf'
  },
  {
    id: 'arc-3', title: 'Review Literatur Metodologi Kualitatif',
    course: 'Metode Riset', courseCode: 'UN-105', completedDate: '28 Apr 2024',
    grade: 'A-', score: 88, feedback: 'Referensi sangat relevan', fileName: 'Matrix_SLR_Draft.xlsx', fileType: 'xlsx'
  },
  {
    id: 'arc-4', title: 'Desain Skema Relasional E-Kantin',
    course: 'Basis Data', courseCode: 'IF-301', completedDate: '25 Apr 2024',
    grade: 'A', score: 92, feedback: 'Normalisasi tepat sasaran', fileName: 'ERD_Kantin_v2.png', fileType: 'png'
  },
  {
    id: 'arc-5', title: 'Mockup UI/UX LMS Mobile App di Figma',
    course: 'Pemrograman Web II', courseCode: 'IF-202', completedDate: '20 Apr 2024',
    grade: 'A+', score: 98, feedback: 'Desain intuitif dan rapi', fileName: 'figma.com/@nadia', fileType: 'link'
  }
];