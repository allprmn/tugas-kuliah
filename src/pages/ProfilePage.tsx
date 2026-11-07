import { useState, useEffect, type ChangeEvent } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import SpotlightCard from '../components/ui/SpotlightCard';
import SuccessModal from '../components/SuccessModal';
import { getProfile, saveProfile, type UserProfile } from '../utils/profileHelper';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({ name: '', nim: '', avatarUrl: '' });
  const [isSaving, setIsSaving] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Ambil data profil saat halaman dimuat
  useEffect(() => {
    setProfile(getProfile());
  }, []);

  // Handle upload foto (konversi ke Base64 agar mudah disimpan tanpa database storage)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulasi loading sebentar agar terasa nyata
    setTimeout(() => {
      saveProfile(profile);
      setIsSaving(false);
       setTimeout(() => {
      saveProfile(profile);
      setIsSaving(false);
      setIsSuccessOpen(true);
    }, 500);
    }, 500);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pl-0 md:pl-[112px]' : 'pl-0'}`}>
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <main className="relative w-full pt-24 bg-background min-h-screen px-gutter flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mt-10"
          >
            <SpotlightCard 
              className="w-full rounded-3xl bg-surface-container-low shadow-2xl p-8 border border-outline-variant/20"
              theme="dark"
              spotlightColor="#b4c5ff"
              intensity={0.15}
              flare
            >
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-on-surface mb-1">Pengaturan Profil</h1>
                <p className="text-sm text-on-surface-variant">Perbarui informasi akun kamu</p>
              </div>

              <div className="flex flex-col gap-6">
                {/* Bagian Foto */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <img 
                      src={profile.avatarUrl} 
                      alt="Avatar" 
                      className="w-28 h-28 rounded-full object-cover border-4 border-surface-container-high group-hover:border-primary transition-colors"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="material-symbols-outlined text-white text-[28px]">photo_camera</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <span className="text-xs text-outline">Klik foto untuk mengubah</span>
                </div>

                {/* Bagian Form */}
                <div className="flex flex-col gap-4 mt-2">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary transition-all"
                      placeholder="Masukkan nama..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">NIM</label>
                    <input 
                      type="text" 
                      value={profile.nim} 
                      onChange={(e) => setProfile({ ...profile, nim: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary transition-all"
                      placeholder="Masukkan NIM..."
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full mt-4 h-11 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        </main>
      </div>
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        title="Profil Diperbarui"
        message="Foto dan data profil kamu berhasil diperbarui di seluruh halaman."
      />
    </div>
  );
}