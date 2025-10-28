// src/components/sections/donation/types/index.ts

export type DonationProject = {
  // FIX 1: ID dari database adalah 'number'
  id: number; 

  title: string;
  description: string;

  // FIX 2: Buat opsional (?) karena API tidak mengirim ini
  longDescription?: string; 

  // FIX 3: Ganti 'image' menjadi 'imageUrl' agar cocok dengan API
  imageUrl: string | null; 

  goal: number;
  raised: number;
  location?: string;
  waNumber?: string;

  // FIX 4: Tambahkan 'status' (ini dikirim oleh API)
  status: string; 
};