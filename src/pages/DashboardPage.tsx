import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TaskModal from '../components/TaskModal';
import { supabase } from '../lib/supabaseClient';
import type { Task } from '../types';

export default function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [searchQuery, setSearchQuery] = useState('');

    const fetchTasks = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('is_completed', false)
            .order('deadline', { ascending: true });

        if (!error && data) {
            setTasks(data);
            window.dispatchEvent(new Event('tasksUpdated'));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCompleteTask = async (id: string) => {
        const { error } = await supabase.from('tasks').update({ is_completed: true }).eq('id', id);
        if (!error) fetchTasks();
    };

    const handleOpenEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (id: string) => {
        if (window.confirm('Yakin ingin menghapus tugas ini?')) {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (!error) {
                fetchTasks();
            } else {
                alert('Gagal menghapus tugas');
            }
        }
    };

    const getDaysRemaining = (deadline: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return { text: 'Hari Ini', color: 'text-error' };
        if (diffDays === 1) return { text: 'Besok', color: 'text-error' };
        if (diffDays > 1) return { text: `H-${diffDays}`, color: 'text-secondary' };
        return { text: `Terlambat`, color: 'text-error' };
    };

    const filteredTasks = tasks.filter(task =>
        (task.course || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
                <Header
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <main className="relative w-full pt-24 bg-background min-h-screen px-gutter">
                    <div className="flex flex-col w-full pb-space-xl pt-6">

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                            <div>
                                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Daftar Tugas Aktif</h1>
                                <p className="text-on-surface-variant mt-1">Selesaikan tugasmu sebelum tenggat waktu tiba.</p>
                            </div>
                            <button
                                onClick={handleOpenAdd}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">add_task</span>
                                Tambah Tugas
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-20 text-on-surface-variant">Memuat data...</div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                                <span className="material-symbols-outlined text-5xl text-tertiary mb-3">task_alt</span>
                                <h3 className="text-lg font-semibold text-on-surface">Tugas tidak ditemukan</h3>
                                <p className="text-on-surface-variant text-sm mt-1">Tidak ada tugas yang cocok dengan pencarianmu.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTasks.map((task) => {
                                    const remaining = getDaysRemaining(task.deadline);

                                    return (
                                        <div key={task.id} className="relative flex flex-col justify-between p-6 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 border border-outline-variant/10 shadow-sm group">
                                            <div>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex gap-2">
                                                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${task.priority === 'Tinggi' ? 'bg-error-container/30 text-error' :
                                                            task.priority === 'Sedang' ? 'bg-secondary-container/20 text-secondary' :
                                                                'bg-surface-container-high text-outline'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-container-high text-on-surface">
                                                            {task.course_code}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {/* Tombol Edit */}
                                                        <button
                                                            onClick={() => handleOpenEdit(task)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container-high hover:text-primary transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>

                                                        {/* Tombol Hapus (BARU) */}
                                                        <button
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-error-container/20 hover:text-error transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-on-surface leading-tight mb-1">{task.title}</h3>
                                                <p className="text-sm text-on-surface-variant mb-4">{task.course}</p>

                                                {task.description && (
                                                    <p className="text-sm text-outline line-clamp-2 mb-4">{task.description}</p>
                                                )}
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-outline">Tenggat</span>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="material-symbols-outlined text-[16px] text-outline">event</span>
                                                        <span className={`text-sm font-bold ${remaining.color}`}>{remaining.text}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleCompleteTask(task.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container/10 text-primary hover:bg-primary hover:text-on-primary font-semibold text-sm transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                    Selesai
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>
                </main>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskAdded={fetchTasks}
                taskToEdit={editingTask}
            />
        </div>
    );
}