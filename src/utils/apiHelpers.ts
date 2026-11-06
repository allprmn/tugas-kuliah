import { supabase } from '../lib/supabaseClient';
export async function fetchDataDariSupabase<T>(tableName: string): Promise<T[]> {
  const { data, error } = await supabase.from(tableName).select('*');
  
  if (error) {
    console.error(`Gagal mengambil data dari tabel ${tableName}:`, error);
    return [];
  }
  
  return (data as T[]) || [];
}