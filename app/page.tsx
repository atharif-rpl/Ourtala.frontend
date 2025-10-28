// app/page.tsx
// INI ADALAH "OTAK" (SERVER COMPONENT) 🧠
// JANGAN taruh "use client" di sini

// 1. IMPORT "TUBUH" (CLIENT COMPONENT BARU ANDA)
import ClientRoot from "./ClientRoot"; 

// 2. IMPORT TIPE DATA (SESUAIKAN PATH)
import type { DonationCampaign } from "./admin/dashboard/donations/types";
import type { DonationProject } from "./components/donation/types";
// app/page.tsx

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

    // Cek 1: Apakah 'data' itu sendiri adalah sebuah array?
    // (Ini terjadi jika DonationResource::collection tidak membungkus)
    if (Array.isArray(data)) {
      return data; // Langsung kembalikan array-nya
    }

    // Cek 2: Apakah 'data' adalah objek yang punya key 'data'
    // dan 'data.data' adalah sebuah array?
    if (data && Array.isArray(data.data)) {
      return data.data; // Kembalikan array yang dibungkus
    }
    
    // Jika bukan keduanya, API mengirim format yang aneh.
    console.warn("Format data API tidak terduga, mengembalikan array kosong.");
    return [];

  } catch (error: any) {
    console.error("Fetch Error:", error.message);
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
    };
  });

  // 7. Otak me-render "Tubuh" (ClientRoot) 
  //    dan memberinya data 'projects'
  return (
    <ClientRoot projects={projectsForComponent} />
  );
}