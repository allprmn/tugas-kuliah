# Aplikasi Manajemen Tugas Kuliah (TugasKuliah)

Aplikasi web full-stack untuk mengelola daftar tugas kuliah, jadwal, dan arsip. Dibangun menggunakan React, TypeScript, Vite, dan Supabase sebagai database.

## Penjelasan Teknis (Sesuai Ketentuan Tugas)

Dokumen ini menjelaskan penggunaan teknologi utama dalam pengembangan aplikasi ini, mulai dari manajemen versi hingga proses *build*.

### 1. Git & GitHub
*   **Apa itu Git?** Git adalah sistem kontrol versi (*Version Control System*) terdistribusi yang digunakan untuk melacak setiap perubahan pada kode sumber.
*   **Implementasi:** Pada proyek ini, Git digunakan untuk mencatat riwayat (*commit*), membuat cabang (*branch*) untuk fitur baru (seperti `fitur-integrasi-kalender`), melakukan penggabungan (*merge*), dan menyelesaikan konflik (*merge conflict*).
*   **GitHub:** Digunakan sebagai repositori *remote* untuk mencadangkan kode secara online, berkolaborasi, serta mengelola *Pull Request*.

### 2. npm (Node Package Manager)
*   **Apa itu npm?** Manajer paket bawaan Node.js yang digunakan untuk mengelola *library* (dependensi) pihak ketiga.
*   **Implementasi:** 
    *   Menggunakan file `package.json` untuk mencatat semua dependensi proyek.
    *   **`dependencies`**: Library yang dibutuhkan saat aplikasi berjalan di *production* (contoh: `react`, `@supabase/supabase-js`, `framer-motion`).
    *   **`devDependencies`**: Library yang hanya dibutuhkan saat proses *development* (contoh: `typescript`, `vite`, `tailwindcss`).
    *   **Semantic Versioning (SemVer)**: Menggunakan format `X.Y.Z` (Major.Minor.Patch). Tanda `^` (caret) pada versi seperti `^18.2.0` memungkinkan npm untuk meng-*update* ke versi *minor* terbaru tanpa merusak kode.

### 3. TypeScript
*   **Apa itu TypeScript?** *Superset* dari JavaScript yang menambahkan sistem tipe statis (*static typing*). Ini membantu mendeteksi *error* saat proses *coding* sebelum aplikasi dijalankan.
*   **Implementasi (Syarat Tugas):**
    *   **Primitive Types**: Menggunakan `string` (judul tugas), `number` (SKS), dan `boolean` (status selesai) pada file `src/types/index.ts`.
    *   **Array**: Menggunakan tipe data array untuk menyimpan daftar tugas `Task[]` dan mata kuliah `Course[]`.
    *   **Interface**: Mendefinisikan struktur objek data yang ketat (contoh: `interface Task`).
    *   **Type Alias & Union Type**: Menggunakan `type Priority = 'Tinggi' | 'Sedang' | 'Rendah'` agar nilai hanya bisa diisi dengan 3 opsi tersebut.
    *   **Generics**: Diimplementasikan pada fungsi `fetchDataDariSupabase<T>` di file `src/utils/apiHelpers.ts` agar fungsi tersebut bisa menerima tipe data tabel apa pun secara dinamis.

### 4. Vite
*   **Apa itu Vite?** *Build tool* modern yang sangat cepat untuk proyek *frontend*.
*   **Implementasi:** Vite digunakan sebagai *development server* (dengan fitur Hot Module Replacement/HMR yang instan) dan sebagai *bundler* saat proses *build* (`npm run build`) untuk menghasilkan file statis siap *deploy* ke Vercel.

### 5. Environment Variables
*   **Apa itu?** Variabel konfigurasi yang disimpan di luar kode sumber (file `.env`) untuk menyimpan data sensitif atau konfigurasi dinamis.
*   **Implementasi:**
    *   **Kerahasiaan**: Kunci API Supabase (`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`) disimpan di `.env` dan **tidak** diunggah ke GitHub (dimasukkan ke `.gitignore`).
    *   **Non-Rahasia**: Nama aplikasi (`VITE_APP_NAME`) dan versi (`VITE_APP_VERSION`) ditampilkan secara publik di antarmuka web (Sidebar).
    *   File `.env.example` disediakan sebagai panduan format variabel yang dibutuhkan.

### 6. Peran Compiler, Transpiler, dan Bundler
Dalam ekosistem pengembangan web modern, ketiga hal ini bekerja sama:
*   **Compiler (TypeScript Compiler / `tsc`)**: Bertugas menerjemahkan kode TypeScript (`.ts` / `.tsx`) menjadi JavaScript murni (`.js`). Karena browser tidak mengerti TypeScript, proses ini wajib dilakukan.
*   **Transpiler (`esbuild` via Vite)**: Bertugas menerjemahkan sintaks JavaScript modern (ES6+) menjadi sintaks yang lebih lama agar kompatibel dengan browser versi lama.
*   **Bundler (`Rollup` via Vite)**: Bertugas menggabungkan puluhan file JavaScript, CSS, dan aset gambar menjadi satu atau beberapa file besar yang dioptimalkan (diminifikasi dan di-*compress*). Ini mengurangi jumlah *request* HTTP saat web dibuka, sehingga *loading* menjadi jauh lebih cepat.

---

## Cara Menjalankan Proyek Secara Lokal

1. Clone repositori ini: 
   ```bash
   git clone https://github.com/allprmn/tugas-kuliah.git
