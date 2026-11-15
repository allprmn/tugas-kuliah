import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProfile, type UserProfile } from '../../utils/profileHelper';
import { supabase } from '../../lib/supabaseClient';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose?: () => void }) {
  const location = useLocation();
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ name: '', nim: '', avatarUrl: '' });

  useEffect(() => {
    setProfile(getProfile());
    window.addEventListener('profileUpdated', () => setProfile(getProfile()));
    return () => window.removeEventListener('profileUpdated', () => setProfile(getProfile()));
  }, []);

  const fetchTaskCount = async () => {
    const { count, error } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('is_completed', false);

    if (!error && count !== null) {
      setActiveTaskCount(count);
    }
  };

  useEffect(() => {
    fetchTaskCount();
    window.addEventListener('tasksUpdated', fetchTaskCount);
    return () => window.removeEventListener('tasksUpdated', fetchTaskCount);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "bg-blue-500/15 text-blue-700 font-semibold border border-blue-500/20 shadow-sm"
      : "text-slate-600 hover:bg-white/50 hover:text-slate-900 border border-transparent";
  };

  const menuItems = [
    { path: '/', label: 'Semua Tugas', icon: 'checklist', badge: activeTaskCount },
    { path: '/mata-kuliah', label: 'Mata Kuliah', icon: 'menu_book' },
    { path: '/jadwal', label: 'Jadwal & Kalender', icon: 'calendar_month' },
    { path: '/arsip', label: 'Arsip Selesai', icon: 'inventory_2' },
    { href: 'https://aldipramana.my.id', label: 'Landing Page', icon: 'open_in_new', isExternal: true },
  ];

  return (
    <>
      {/* BACKDROP: Hanya muncul di mobile saat sidebar terbuka */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[45] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} 
      />

      {/* LIQUID GLASS SIDEBAR (Murni Tailwind) */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 
          bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border-r border-white/50
          shadow-[0_8px_32px_rgba(0,0,0,0.08)]
          z-50 flex flex-col justify-between 
          transition-all duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:left-4 md:top-4 md:bottom-4 md:h-auto md:translate-x-0 
          md:w-[80px] md:hover:w-[260px] 
          md:rounded-3xl md:border md:border-white/60 md:shadow-2xl
          group
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          
          {/* === PROFILE SECTION === */}
          <Link to="/profile" className="h-20 flex items-center px-4 mt-2 hover:bg-white/50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/40">
            <div className="flex items-center gap-3 w-full">
              <img src={profile.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full shrink-0 object-cover ring-2 ring-white/80 shadow-md" />
              <div className="flex flex-col whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-label-md text-label-md text-slate-800 font-bold">{profile.name}</span>
                <span className="font-label-sm text-label-sm text-slate-500">{profile.nim}</span>
              </div>
            </div>
          </Link>

          {/* === SEARCH BAR === */}
          <div className="px-4 mb-4 whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
            <div className="relative flex items-center group/search">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px] group-focus-within/search:text-blue-500 transition-colors">search</span>
              <input
                type="text"
                placeholder="Search dashboard"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-white/40 border border-white/50 text-slate-800 placeholder:text-slate-400 font-body-sm focus:outline-none focus:bg-white/80 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          {/* === NAVIGATION === */}
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {menuItems.map((item) => {
              const isExt = item.isExternal;
              const sharedClasses = `flex items-center gap-4 px-3 py-3 rounded-xl transition-all font-label-lg text-label-lg whitespace-nowrap`;

              // 1. Render untuk Link Eksternal (Landing Page)
              if (isExt) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${sharedClasses} text-slate-600 hover:bg-white/50 hover:text-slate-900 border border-transparent`}
                  >
                    <span className="material-symbols-outlined text-[24px] shrink-0">{item.icon}</span>
                    <span className="flex-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                      {item.label}
                    </span>
                  </a>
                );
              }

              // 2. Render untuk Link Internal (React Router)
              return (
                <Link
                  key={item.path || item.label}
                  to={item.path || '/'}
                  className={`${sharedClasses} ${getLinkClass(item.path || '')}`}
                >
                  <span className="material-symbols-outlined text-[24px] shrink-0">
                    {item.icon}
                  </span>
                  
                  <span className="flex-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {item.label}
                  </span>

                  {/* Badge Angka */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* === BOTTOM ACTION BUTTONS === */}
          <div className="p-4 mt-auto">
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/profile" 
                className="flex items-center justify-center h-10 w-full rounded-xl bg-white/40 border border-white/50 hover:bg-white/70 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
                title="Pengaturan Profil"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </Link>
              <button className="flex items-center justify-center h-10 w-full rounded-xl bg-white/40 border border-white/50 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-600 text-slate-600 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
            
            {/* App Version */}
            <div className="text-center text-[10px] text-slate-400 font-medium tracking-wide whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mt-4">
              {import.meta.env.VITE_APP_NAME} v{import.meta.env.VITE_APP_VERSION}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}