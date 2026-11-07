import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { isNotificationEnabled, sendNotification } from './utils/notificationHelper';
import DashboardPage from './pages/DashboardPage';
import MataKuliahPage from './pages/MataKuliahPage';
import JadwalPage from './pages/JadwalPage';
import ArsipPage from './pages/ArsipPage';
import ProfilePage from './pages/ProfilePage';
import NotificationPage from './pages/NotificationPage';


function App() {
 useEffect(() => {
    const checkTodayDeadlines = async () => {
      if (!isNotificationEnabled()) return;

      const todayStr = new Date().toLocaleDateString('en-CA');
      const lastNotified = localStorage.getItem('last_notified_date');

      if (lastNotified === todayStr) return;

      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('deadline', todayStr)
        .eq('is_completed', false);

      if (data && data.length > 0) {
        sendNotification("Peringatan Deadline Hari Ini! ⏰", {
          body: `Kamu memiliki ${data.length} tugas yang harus diselesaikan hari ini. Cek dashboard sekarang!`,
        });
        
        localStorage.setItem('last_notified_date', todayStr);
      }
    };
    checkTodayDeadlines();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/mata-kuliah" element={<MataKuliahPage />} />
        <Route path="/jadwal" element={<JadwalPage />} />
        <Route path="/arsip" element={<ArsipPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;