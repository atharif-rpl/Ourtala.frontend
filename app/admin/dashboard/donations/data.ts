// /components/donations/data.ts

import { DonationCampaign } from "./types"

export const initialCampaigns: DonationCampaign[] = [
  {
    id: 1,
    title: "School Urban Garden",
    location: "Bandung",
    description: "Bantu bangun kebun edukasi di sekolah untuk ajarkan anak-anak soal pangan berkelanjutan.",
    imageUrl: "https://via.placeholder.com/400x200",
    amountCollected: 20000000,
    amountTarget: 25000000,
    whatsappLink: "#",
    status: "active",
  },
  {
    id: 2,
    title: "School Urban Garden",
    location: "Cibubur",
    description: "Bantu bangun kebun edukasi di sekolah untuk ajarkan anak-anak soal pangan berkelanjutan.",
    imageUrl: "https://via.placeholder.com/400x200",
    amountCollected: 25000000,
    amountTarget: 100000000,
    whatsappLink: "#",
    status: "active",
  },
  {
    id: 3,
    title: "Pembangunan Sumur Bersih",
    location: "Bogor",
    description: "Menyediakan akses air bersih untuk desa terpencil.",
    imageUrl: "https://via.placeholder.com/400x200",
    amountCollected: 50000000,
    amountTarget: 50000000,
    whatsappLink: "#",
    status: "completed",
  },
]