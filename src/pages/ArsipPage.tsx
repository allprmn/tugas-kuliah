import  { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AnimatedList from '../components/ui/AnimatedList';
import LatticeLoader from '../components/ui/LatticeLoader';
import ArchiveDetailModal from '../components/ArchiveDetailModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { supabase } from '../lib/supabaseClient';
import type { Task } from '../types';


export default function ArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [archives, setArchives] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State pencarian yang terhubung ke Header
  const [searchQuery, setSearchQuery] = useState('');

  // Ambil data yang sudah selesai dari Supabase
  useEffect(() => {
    const fetchArchives = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', true)
        .order('deadline', { ascending: false });

      if (!error && data) setArchives(data);
      setIsLoading(false);
    };

    fetchArchives();
  }, []);

  // Filter pencarian berdasarkan Judul Tugas atau Nama Mata Kuliah
  const filteredArchives = archives.filter(task =>
    (task.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.course || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.course_code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteArchive = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskToDelete.id);

    setIsDeleting(false);

    if (error) {
      alert('Gagal menghapus tugas: ' + error.message);
    } else {
      setTaskToDelete(null);
      setSelectedTask(null); 
      window.location.reload(); 
    }
  };

  const listItems = filteredArchives.map((task) => ({
    title: task.title,
    description: `${task.course} (${task.course_code})`,
    meta: task.deadline,
    
    originalData: task
  }));

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>

        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
          <div className="flex flex-col w-full pb-space-xl pt-6 max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Arsip Tugas Selesai</h1>
                <p className="text-on-surface-variant mt-1 text-sm">Daftar seluruh tugas kuliah yang telah kamu tuntaskan.</p>
              </div>
            </div>

            {/* Tampilan List Animasi */}
            <div className="mt-4 w-full max-w-5xl mx-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <LatticeLoader
                    status="working"
                    label="Memuat Arsip..."
                    pattern="orbit"
                    color="#dae2fd"
                    showTimer={false}
                  />
                </div>
              ) : filteredArchives.length === 0 ? (
                <div className="w-full text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">inventory_2</span>
                  <h3 className="text-lg font-semibold text-on-surface">Arsip Tidak Ditemukan</h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {searchQuery ? `Tidak ada arsip yang cocok dengan pencarian "${searchQuery}".` : 'Belum ada tugas yang diselesaikan.'}
                  </p>
                </div>
              ) : (
                <AnimatedList
                  items={listItems}
                  onItemSelect={(item,) => {
                    const selectedData = (item as any).originalData;
                    if (selectedData) setSelectedTask(selectedData);
                  }
                  }
                  animation="pop"
                  theme="dark"
                  width="100%"
                  maxHeight={600}
                  radius={14}
                  gap={12}
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

          </div>
        </main>
      </div>
      <ArchiveDetailModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        task={selectedTask} 
        onDelete={() => setTaskToDelete(selectedTask)}
      />

      <ConfirmDeleteModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteArchive}
        task={taskToDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}