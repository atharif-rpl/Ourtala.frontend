// /components/donations/ManageDonationsPage.tsx

"use client"

import { useState, useEffect } from "react"
// Hapus 'initialCampaigns' karena kita akan fetch dari API
// import { initialCampaigns } from "./data" 
import type { DonationCampaign } from "./types"
import { DonationsHeader } from "./DonationsHeader"
import { CampaignCard } from "./CampaignCard"
import { EmptyState } from "./EmptyState"
import { CampaignFormModal } from "./CampaignFormModal"

export default function ManageDonationsPage() {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState<Partial<DonationCampaign> | null>(null)

  // Ambil URL API dari environment variables
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // --- 1. FUNGSI BARU UNTUK MENGAMBIL DATA ---
  // Kita buat fungsi ini agar bisa dipanggil ulang untuk me-refresh
  const fetchCampaigns = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${apiUrl}/donations`, { cache: 'no-store' })
      if (!res.ok) throw new Error("Gagal mengambil data")
      
      const data = await res.json()
      // 'data.data' jika Anda menggunakan Resource Collection
      setCampaigns(data.data || data) 
    } catch (error) {
      console.error(error)
      alert("Gagal memuat campaign.")
    } finally {
      setIsLoading(false)
    }
  }

  // --- 2. GANTI useEffect ---
  // Sekarang useEffect akan memanggil API saat halaman dibuka
  useEffect(() => {
    fetchCampaigns()
  }, []) // Dependency array kosong, jalan sekali saat mount

  // --- 3. FUNGSI BARU UNTUK MENANGANI DELETE ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin mau hapus campaign ini?")) {
      return
    }

    try {
      const res = await fetch(`${apiUrl}/donations/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Gagal menghapus data")
      }

      alert('Campaign berhasil dihapus!')
      fetchCampaigns() // Refresh data setelah berhasil hapus
      
    } catch (error: any) {
      console.error(error)
      alert("Error: " + error.message)
    }
  }

  // --- 4. FUNGSI BARU UNTUK CALLBACK SUKSES ---
  // Ini akan dipanggil oleh modal JIKA submit (add/edit) berhasil
  const handleSuccess = () => {
    setSelectedCampaign(null) // Tutup modal
    fetchCampaigns() // Ambil data terbaru dari server
  }

  if (isLoading) return <div className="p-6 text-slate-600">Loading campaigns...</div>

  return (
    <div className="p-6">
      {/* Ini sudah benar, 'onAddCampaign' tidak ada di DonationsHeader */}
      <DonationsHeader onAddCampaign={() => setSelectedCampaign({})} />

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              // Ini sudah benar
              onEdit={() => setSelectedCampaign(campaign)}
              // Arahkan ke fungsi 'handleDelete' yang baru
              onDelete={() => handleDelete(campaign.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* --- 5. MODIFIKASI PROPS MODAL --- */}
      {/* Kita hanya render modal jika 'selectedCampaign' tidak null */}
      {selectedCampaign && (
        <CampaignFormModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          // Ganti 'onSave' menjadi 'onSuccess'
          // Modal Anda akan memanggil ini setelah API call-nya sukses
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  )
}