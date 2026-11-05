// Fungsi Generics Sederhana untuk localStorage
export function simpanData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function ambilData<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}