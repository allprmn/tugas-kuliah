import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import type { Task } from '../types';

interface ArchiveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onDelete: () => void;
}

export default function ArchiveDetailModal({ isOpen, onClose, task, onDelete }: ArchiveDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && task && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* 2. KOTAK MODAL (Animasi Pop-up) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 3. SPOTLIGHT CARD */}
            <SpotlightCard
              className="w-full rounded-2xl bg-surface-container-low shadow-2xl p-6 border border-outline-variant/20"
              theme="dark"
              spotlightColor="#b4c5ff"
              intensity={0.15}
              flare
            >
              {/* Header Modal */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-surface-container-high text-primary">
                      {task.course_code}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-tertiary-container/30 text-tertiary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Selesai
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface leading-tight">
                    {task.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-high hover:text-on-surface transition-colors shrink-0 relative z-20"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Isi Detail */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container p-3 rounded-lg">
                    <span className="text-xs text-outline block mb-1">Mata Kuliah</span>
                    <span className="text-sm font-semibold text-on-surface">{task.course}</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded-lg">
                    <span className="text-xs text-outline block mb-1">Tenggat Waktu</span>
                    <span className="text-sm font-semibold text-on-surface">{task.deadline}</span>
                  </div>
                </div>

                <div className="bg-surface-container p-3 rounded-lg">
                  <span className="text-xs text-outline block mb-1">Deskripsi Tugas</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {task.description || 'Tidak ada deskripsi yang dilampirkan.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">flag</span>
                  <span>Prioritas:</span>
                  <span className={`font-semibold ${task.priority === 'Tinggi' ? 'text-error' :
                      task.priority === 'Sedang' ? 'text-primary' :
                        'text-outline'
                    }`}>{task.priority}</span>
                </div>
              </div>

              {/* Tombol Tutup */}
              <div className="mt-8 flex justify-between items-center border-t border-outline-variant/20 pt-4">
                <button
                  onClick={onDelete}
                  className="px-4 py-2 rounded-xl bg-error-container/20 text-error hover:bg-error-container/40 font-semibold text-sm transition-colors flex items-center gap-2 relative z-20"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Hapus Tugas
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-colors relative z-20"
                >
                  Tutup
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}