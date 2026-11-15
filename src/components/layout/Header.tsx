import { getProfile, type UserProfile } from '../../utils/profileHelper';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ 
 onToggleSidebar, 
  searchQuery = '', 
  setSearchQuery = () => {} 
}: { 
  onToggleSidebar: () => void, 
  searchQuery?: string, 
  setSearchQuery?: (val: string) => void 
}) {

  const [profile, setProfile] = useState<UserProfile>({ name: '', nim: '', avatarUrl: '' });

  useEffect(() => {
    setProfile(getProfile());
    window.addEventListener('profileUpdated', () => setProfile(getProfile()));
    return () => window.removeEventListener('profileUpdated', () => setProfile(getProfile()));
  }, []);

  return (
    <header className="fixed top-4 right-4 left-4 md:left-[112px] h-16 z-40 flex items-center justify-between px-4 md:px-6 rounded-2xl bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
      
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button onClick={onToggleSidebar} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* 2. SEARCH BAR LIGHT MODE */}
        <div className="relative w-full max-w-sm group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] group-focus-within:text-blue-500 transition-colors">
            search
          </span>
          <input 
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100/50 text-slate-800 placeholder:text-slate-400 font-body-sm text-body-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all border border-transparent hover:border-slate-200 focus:border-blue-500/30" 
            placeholder="Cari tugas, modul..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* === BAGIAN KANAN: Info & Profil === */}
      <div className="flex items-center gap-3 md:gap-5 shrink-0">
        
        {/* Tombol Notifikasi */}
        <Link 
          to="/notifications"
          aria-label="Pemberitahuan" 
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer" 
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-slate-200"></div>

        {/* Profil Pengguna */}
       <Link to="/profile" className="flex items-center gap-2 md:gap-3 pl-1 hover:opacity-80 transition-opacity cursor-pointer">
          <img alt="Profile" className="w-9 h-9 rounded-xl object-cover bg-slate-200 border border-slate-200" src={profile.avatarUrl} />
          <div className="hidden lg:flex flex-col text-left">
            <span className="font-label-md text-label-md text-slate-800 font-semibold leading-tight">{profile.name}</span>
            <span className="font-label-sm text-label-sm text-slate-500 leading-tight">{profile.nim}</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px] hidden lg:block">expand_more</span>
        </Link>

      </div>
    </header>
  );
}