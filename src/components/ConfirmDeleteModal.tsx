import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import type { Task } from '../types';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, task, isLoading }: ConfirmDeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && task && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" // z-[110] agar di atas detail modal
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <SpotlightCard 
              className="w-full rounded-2xl bg-surface-container-low shadow-2xl p-6 border border-error/30"
              theme="dark"
              spotlightColor="#ef4444" // Warna merah untuk hapus
              intensity={0.2}
              flare
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-error-container/20 text-error flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">delete_forever</span>
                </div>

                <h2 className="text-xl font-bold text-on-surface mb-2">
                  Hapus Tugas Permanen?
                </h2>
                <p className="text-sm text-on-surface-variant mb-6">
                  Tugas <span className="font-semibold text-error">"{task.title}"</span> akan dihapus dari database dan tidak dapat dikembalikan.
                </p>

                <div className="flex w-full gap-3">
                  <button 
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 py-2.5 rounded-xl bg-error text-on-error font-semibold text-sm shadow-lg shadow-error/25 hover:bg-error/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        Menghapus...
                      </>
                    ) : (
                      'Ya, Hapus'
                    )}
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}