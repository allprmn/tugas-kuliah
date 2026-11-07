import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Berhasil!", 
  message = "Perubahan telah disimpan." 
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-sm relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <SpotlightCard 
              className="w-full rounded-2xl bg-surface-container-low shadow-2xl p-6 border border-tertiary/20"
              theme="dark"
              spotlightColor="#4edea3" // Warna hijau (tertiary)
              intensity={0.2}
              flare
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>

                <h2 className="text-xl font-bold text-on-surface mb-2">
                  {title}
                </h2>
                <p className="text-sm text-on-surface-variant mb-6">
                  {message}
                </p>

                <button 
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-colors"
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