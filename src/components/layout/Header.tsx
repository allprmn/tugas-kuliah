import React from 'react';

export default function Header({ isSidebarOpen, onToggleSidebar }: { isSidebarOpen: boolean, onToggleSidebar: () => void }) {
  return (
    // Header dibuat melayang (top-4, right-4) dan menyesuaikan dengan lebar sidebar di desktop (md:left-[112px])
    <header className="fixed top-4 right-4 left-4 md:left-[112px] h-16 z-40 flex items-center justify-between px-4 md:px-6 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-outline-variant/20 shadow-lg transition-all duration-300">
      
      {/* === BAGIAN KIRI: Tombol Mobile & Search === */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Tombol Hamburger - Hanya tampil di Mobile */}
        <button 
          onClick={onToggleSidebar}
          aria-label="Buka Tutup Sidebar" 
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" 
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* Search Bar Minimalis */}
        <div className="relative w-full max-w-sm group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] group-focus-within:text-primary transition-colors">
            search
          </span>
          <input 
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-highest/50 text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/30" 
            placeholder="Cari tugas, modul..." 
            type="text"
          />
        </div>
      </div>

      {/* === BAGIAN KANAN: Info & Profil === */}
      <div className="flex items-center gap-3 md:gap-5 shrink-0">
        
        {/* Info Semester (Sembunyikan di layar kecil) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-highest/50 border border-outline-variant/10 font-label-sm text-label-sm text-secondary">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span>Semester 5 - Teknik Informatika</span>
        </div>

        {/* Tombol Notifikasi */}
        <button 
          aria-label="Pemberitahuan" 
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" 
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-error border-2 border-surface-container"></span>
        </button>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-outline-variant/30"></div>

        {/* Profil Pengguna */}
        <button className="flex items-center gap-2 md:gap-3 pl-1 hover:opacity-80 transition-opacity">
          <img 
            alt="Profile" 
            className="w-9 h-9 rounded-xl object-cover bg-surface-container-highest border border-outline-variant/20" 
            src="https://ui-avatars.com/api/?name=Nadia+Larasati&background=2563eb&color=fff" 
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">Nadia Larasati</span>
            <span className="font-label-sm text-label-sm text-outline leading-tight">Mahasiswa</span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px] hidden lg:block">expand_more</span>
        </button>

      </div>
    </header>
  );
}