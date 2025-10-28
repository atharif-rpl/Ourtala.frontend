// app/page.tsx
// INI ADALAH "OTAK" (SERVER COMPONENT) 🧠
// JANGAN taruh "use client" di sini

// 1. IMPORT "TUBUH" (CLIENT COMPONENT BARU ANDA)
// (Pastikan path ini benar)
import ClientRoot from "./ClientRoot"; 

// 2. IMPORT TIPE DATA (SESUAIKAN PATH)
// (Path Anda sepertinya sudah benar jika 'components' dan 'admin' ada di dalam 'app')
import type { DonationCampaign } from "./admin/dashboard/donations/types";
import type { DonationProject } from "./components/donation/types"; // atau ./components/sections/donation/types

// 3. FUNGSI "OTAK" YANG SUDAH DIPERBAIKI
async function getCampaigns(): Promise<DonationCampaign[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/donations`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const data = await res.json(); 

    // --- LOGIKA BARU YANG LEBIH PINTAR ---
    if (Array.isArray(data)) {
      return data; // Langsung kembalikan array-nya
    }
    if (data && Array.isArray(data.data)) {
      return data.data; // Kembalikan array yang dibungkus
    }
    
    console.warn("Format data API tidak terduga, mengembalikan array kosong.");
    return [];

  // --- FIX ERROR VERCEL DI SINI ---
  } catch (error: unknown) { // Ganti 'any' menjadi 'unknown'
    let message = "Unknown fetch error";
    if (error instanceof Error) {
      message = error.message; // Sekarang aman mengakses .message
    }
    console.error("Fetch Error:", message);
    return []; // Jika fetch gagal, kembalikan array kosong
  }
}

// 4. INI ADALAH HALAMAN SERVER ANDA
export default async function Home() {
  
  // 5. Otak mengambil data dari Laravel
  const campaignsFromApi = await getCampaigns();

  // 6. Otak "menerjemahkan" data API (DonationCampaign)
  //    menjadi data yang dimengerti Tubuh (DonationProject)
  const projectsForComponent: DonationProject[] = campaignsFromApi.map(campaign => {
    // Pastikan Tipe 'DonationProject' Anda Menerima Semua Properti Ini
    return {
      id: campaign.id,
      title: campaign.title,
      location: campaign.location,
      description: campaign.description,
      imageUrl: campaign.imageUrl,
      goal: Number(campaign.amountTarget) || 0,
      raised: Number(campaign.amountCollected) || 0,
      waNumber: campaign.whatsappLink || "", 
      status: campaign.status || "active",
      
      // Jika 'DonationProject' butuh 'longDescription',
      // Anda bisa isi dengan 'campaign.description' lagi
      longDescription: campaign.description, 
    };
  });

  // 7. Otak me-render "Tubuh" (ClientRoot) 
  //    dan memberinya data 'projects'
  return (
    <ClientRoot projects={projectsForComponent} />
  );
}