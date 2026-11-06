import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

// Tambahkan onClose pada props
export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose?: () => void }) {
  const location = useLocation();
  const [activeTaskCount, setActiveTaskCount] = useState(0);

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
      ? "bg-primary-container/20 text-primary"
      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface";
  };

  const menuItems = [
    { path: '/', label: 'Semua Tugas', icon: 'checklist', badge: activeTaskCount },
    { path: '/mata-kuliah', label: 'Mata Kuliah', icon: 'menu_book' },
    { path: '/jadwal', label: 'Jadwal & Kalender', icon: 'calendar_month' },
    { path: '/arsip', label: 'Arsip Selesai', icon: 'inventory_2' },
    { path: '/statistik', label: 'Statistik', icon: 'insights' },
  ];

  return (
    <>
      {/* BACKDROP: Hanya muncul di mobile saat sidebar terbuka */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose} // Klik area gelap untuk menutup sidebar
      />

      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.25)] z-50 flex flex-col justify-between 
          transition-all duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:left-4 md:top-4 md:bottom-4 md:h-auto md:translate-x-0 
          md:w-[80px] md:hover:w-[260px] 
          md:rounded-3xl group
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">

          {/* === PROFILE SECTION === */}
          <div className="h-20 flex items-center px-4 mt-2">
            <div className="flex items-center gap-3 w-full">
              <img
                src="https://ui-avatars.com/api/?name=Aldi+Pramana&background=2563eb&color=fff"
                alt="Profile"
                className="w-10 h-10 rounded-full shrink-0 object-cover ring-2 ring-primary/20"
              />
              <div className="flex flex-col whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Aldi Pramana</span>
                <span className="font-label-sm text-label-sm text-outline">1247050031</span>
              </div>
            </div>
          </div>

          {/* === SEARCH BAR === */}
          <div className="px-4 mb-4 whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search dashboard"
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-surface-container text-on-surface placeholder:text-outline font-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          {/* === NAVIGATION === */}
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all font-label-lg text-label-lg whitespace-nowrap ${getLinkClass(item.path)}`}
              >
                <span className="material-symbols-outlined text-[24px] shrink-0">{item.icon}</span>
                <span className="flex-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* === BOTTOM ACTION BUTTONS === */}
          <div className="p-4 mt-auto">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center h-10 w-full rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
              <button className="flex items-center justify-center h-10 w-full rounded-xl bg-surface-container hover:bg-error/20 hover:text-error text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
            <div className="text-center text-[10px] text-outline font-medium tracking-wide whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {import.meta.env.VITE_APP_NAME} v{import.meta.env.VITE_APP_VERSION}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}