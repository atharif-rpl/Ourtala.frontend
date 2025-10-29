// app/page.tsx
// INI ADALAH "OTAK" (SERVER COMPONENT) 🧠
// Jangan taruh "use client" di sini!

// 1. IMPORT "TUBUH" (CLIENT COMPONENT)
import ClientRoot from "./ClientRoot";

// 2. IMPORT TIPE DATA
import type { DonationCampaign } from "./admin/dashboard/donations/types";
import type { DonationProject } from "./components/donation/types"; // Atau path yang benar

// 3. (Opsional tapi direkomendasikan untuk Vercel) Eksplisit menyatakan halaman ini dinamis
export const dynamic = 'force-dynamic'; // Atau bisa juga: export const revalidate = 0;

// 4. FUNGSI FETCH DATA DARI BACKEND
async function getCampaigns(): Promise<DonationCampaign[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Tambahkan console log untuk memastikan URL benar saat runtime
  console.log("🔗 Fetching campaigns from:", `${apiUrl}/donations`);

  try {
    // --- TAMBAHKAN KEMBALI { cache: "no-store" } ---
    const res = await fetch(`${apiUrl}/donations`, { cache: "no-store" });
    // ---------------------------------------------

    if (!res.ok) {
      // Log status error jika fetch gagal
      console.error(`❌ API request failed with status: ${res.status}`);
      throw new Error(`Gagal mengambil data dari API (Status: ${res.status})`);
    }

    const data = await res.json();

    // --- LOGIKA UNTUK MENANGANI FORMAT API ---
    if (Array.isArray(data)) {
      console.log(`✅ Fetched ${data.length} campaigns (direct array).`);
      return data;
    }
    if (data && Array.isArray(data.data)) {
      console.log(`✅ Fetched ${data.data.length} campaigns (wrapped in data key).`);
      return data.data;
    }

    console.warn("⚠️ Format data API tidak terduga, mengembalikan array kosong:", data);
    return [];

  } catch (error: unknown) {
    let message = "Unknown fetch error";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("❌ Fetch Error:", message);
    // Di produksi, mungkin lebih baik tidak mengembalikan error ke client
    // throw new Error("Gagal memuat data campaign."); // Atau handle error dengan cara lain
    return []; // Kembalikan array kosong agar halaman tetap bisa render
  }
}

// 5. FUNGSI UTAMA HALAMAN (SERVER COMPONENT)
export default async function Home() {
  console.log("🔄 Rendering Home page component on server...");
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
      longDescription: campaign.description, // Isi sesuai kebutuhan
    };
  });
  console.log(`📊 Processed ${projectsForComponent.length} projects for ClientRoot.`);

  // 8. RENDER CLIENT COMPONENT DENGAN DATA
  return <ClientRoot projects={projectsForComponent} />;
}