import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AnimatedList from '../components/ui/AnimatedList';
import BellToggle from '../components/ui/BellToggle';
import { supabase } from '../lib/supabaseClient';
import { requestNotificationPermission, isNotificationEnabled, setNotificationStatus, sendNotification } from '../utils/notificationHelper';
import type { Task } from '../types';

export default function NotificationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(isNotificationEnabled());

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', false)
        .order('deadline', { ascending: true });
      
      if (data) setTasks(data);
      setIsLoading(false);
    };
    fetchTasks();
  }, []);

  const todayStr = new Date().toLocaleDateString('en-CA');
  const todayTasksCount = tasks.filter(t => t.deadline === todayStr).length;

  const handleToggleChange = async (pressed: boolean) => {
    if (pressed) {
      
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationStatus(true);
        setNotifEnabled(true);
        sendNotification("Notifikasi Diaktifkan!", { body: "Kamu akan menerima pengingat deadline tugas." });
      } else {
        alert("Izin notifikasi ditolak. Silakan izinkan melalui pengaturan browser (ikon gembok di URL).");
        setNotifEnabled(false); 
      }
    } else {
      setNotificationStatus(false);
      setNotifEnabled(false);
    }
  };

  // Fungsi simulasi
  const testTodayDeadline = () => {
    const todayTasks = tasks.filter(t => t.deadline === todayStr);
    
    if (todayTasks.length > 0) {
      todayTasks.forEach(task => {
        sendNotification(`Tenggat Hari Ini: ${task.title}`, {
          body: `Mata Kuliah: ${task.course} (${task.course_code})`,
        });
      });
    } else {
      alert("Tidak ada tugas yang deadline-nya hari ini untuk dites.");
    }
  };

  const listItems = tasks.map((task) => ({
    title: `Deadline: ${task.title}`,
    description: `${task.course} (${task.course_code})`,
    meta: task.deadline,
    originalData: task
  }));

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-4xl mx-auto">
            
            {/* Header & Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <div>
                <h1 className="text-2xl font-bold text-on-surface tracking-tight">Notifikasi Deadline</h1>
                <p className="text-sm text-on-surface-variant mt-1">Dapatkan pengingat langsung di perangkatmu.</p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                {notifEnabled && (
                  <button 
                    onClick={testTodayDeadline}
                    className="text-xs px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-primary font-medium"
                  >
                    Tes Notif Hari Ini
                  </button>
                )}
                
                {/* KOMPONEN BELL TOGGLE DARI REACTBITS */}
                <BellToggle
                  key={notifEnabled ? 'on' : 'off'}
                  defaultPressed={notifEnabled}
                  onChange={handleToggleChange}
                  offLabel="Aktifkan Notif"
                  onLabel="Notif Aktif"
                  color="#dae2fd"
                  background="#222a3d"
                  onColor="#002a78"
                  onBackground="#b4c5ff"
                  size="md"
                  radius={22}
                  ringAmplitude={17}
                  ringPasses={5}
                  ringDecay={1}
                  ringDuration={820}
                  ringPivot={16}
                  crossfadeMs={200}
                  revealBounce={0}
                  count={todayTasksCount}
                  badge
                  badgeColor="#ef4444"
                  waves
                  clapper={false}
                />
                
              </div>
            </div>

            <div className="w-full">
              {isLoading ? (
                <div className="text-center py-20 text-on-surface-variant animate-pulse">Memuat data...</div>
              ) : listItems.length === 0 ? (
                <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">notifications_paused</span>
                  <h3 className="text-lg font-semibold text-on-surface">Tidak Ada Notifikasi</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Semua tugas sudah kamu selesaikan dengan baik!</p>
                </div>
              ) : (
                <AnimatedList
                  items={listItems}
                  onItemSelect={(item) => {
                    console.log("Notif diklik:", (item as any).originalData);
                  }}
                  animation="slide"
                  theme="dark"
                  width="100%"
                  maxHeight={500}
                  radius={14}
                  gap={10}
                  stagger={0.05}
                  fadeSize={56}
                  frame
                  showGradients
                  displayScrollbar
                  selectOnHover
                  enableArrowNavigation
                  loop={false}
                  animateOnce={false}
                  initialSelectedIndex={-1}
                />
              )}
            </div>
            
            <p className="text-xs text-center text-outline mt-6">
              *Notifikasi hanya akan muncul selama tab aplikasi ini terbuka di browser.
            </p>

          </div>
        </main>
      </div>
    </div>
  );
}