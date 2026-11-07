// Meminta izin notifikasi ke browser
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    alert("Browser ini tidak mendukung notifikasi desktop.");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

// Mengirim notifikasi
export const sendNotification = (title: string, options?: NotificationOptions) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      icon: "/vite.svg", // Ganti dengan logo aplikasimu jika ada
      badge: "/vite.svg",
      ...options,
    });
  }
};

// Cek status aktif/tidaknya notifikasi di LocalStorage
export const isNotificationEnabled = (): boolean => {
  return localStorage.getItem("notif_enabled") === "true";
};

export const setNotificationStatus = (status: boolean) => {
  localStorage.setItem("notif_enabled", status.toString());
};