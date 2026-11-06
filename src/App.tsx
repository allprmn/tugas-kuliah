import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import MataKuliahPage from './pages/MataKuliahPage';
import JadwalPage from './pages/JadwalPage';
import ArsipPage from './pages/ArsipPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/mata-kuliah" element={<MataKuliahPage />} />
        <Route path="/jadwal" element={<JadwalPage />} />
        <Route path="/arsip" element={<ArsipPage />} />
      </Routes>
    </Router>
  );
}

export default App;