export interface UserProfile {
  name: string;
  nim: string;
  avatarUrl: string;
}

// Data default
const DEFAULT_PROFILE: UserProfile = {
  name: 'Aldi Pramana',
  nim: '1247050031',
  avatarUrl: 'https://ui-avatars.com/api/?name=Aldi+Pramana&background=2563eb&color=fff'
};

// Mengambil profil dari LocalStorage
export const getProfile = (): UserProfile => {
  const saved = localStorage.getItem('user_profile');
  return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
};

// Menyimpan profil dan memicu event agar Header & Sidebar langsung update
export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem('user_profile', JSON.stringify(profile));
  window.dispatchEvent(new Event('profileUpdated'));
};