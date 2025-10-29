// app/page.tsx
// INI ADALAH "OTAK" (SERVER COMPONENT) 🧠
// Jangan taruh "use client" di sini!

// 1. IMPORT "TUBUH" (CLIENT COMPONENT)
import ClientRoot from "./ClientRoot";

// 2. IMPORT TIPE DATA
import type { DonationCampaign } from "./admin/dashboard/donations/types";
import type { DonationProject } from "./components/donation/types";

// 3. SETTING UNTUK NEXT.JS RENDER DINAMIS (FIX ERROR VERCEL)
export const dynamic = "force-dynamic";
export const revalidate = 0; // Pastikan selalu ambil data baru dari API

// 4. FUNGSI FETCH DATA DARI BACKEND
async function getCampaigns(): Promise<DonationCampaign[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("🔗 Fetching from:", `${apiUrl}/donations`);

  try {
    const res = await fetch(`${apiUrl}/donations`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const data = await res.json();

    // --- LOGIKA UNTUK MENANGANI FORMAT API ---
    if (Array.isArray(data)) {
      return data;
    }
    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    console.warn("⚠️ Format data API tidak terduga, mengembalikan array kosong.");
    return [];

  } catch (error: unknown) {
    // --- FIX TIPE 'any' KE 'unknown' ---
    let message = "Unknown fetch error";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("❌ Fetch Error:", message);
    return [];
  }
}

// 5. FUNGSI UTAMA HALAMAN (SERVER COMPONENT)
export default async function Home() {
  // 6. OTOMATIS AMBIL DATA DARI LARAVEL BACKEND
  const campaignsFromApi = await getCampaigns();

  // 7. KONVERSI DATA API → FORMAT UNTUK CLIENT COMPONENT
  const projectsForComponent: DonationProject[] = campaignsFromApi.map((campaign) => {
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
      longDescription: campaign.description,
    };
  });

  // 8. RENDER CLIENT COMPONENT DENGAN DATA
  return <ClientRoot projects={projectsForComponent} />;
}
