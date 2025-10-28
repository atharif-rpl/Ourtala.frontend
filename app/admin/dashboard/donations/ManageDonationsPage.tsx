"use client"

import { useState, useEffect, useCallback } from "react" // <-- Tambah useCallback
import type { DonationCampaign } from "./types"
import { DonationsHeader } from "./DonationsHeader"
import { CampaignCard } from "./CampaignCard"
import { EmptyState } from "./EmptyState"
import { CampaignFormModal } from "./CampaignFormModal";

export default function ManageDonationsPage() {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState<Partial<DonationCampaign> | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // FIX 1: Bungkus dengan useCallback
  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${apiUrl}/donations`, { cache: 'no-store' })
      if (!res.ok) throw new Error("Gagal mengambil data")
      
      const data = await res.json()
      setCampaigns(data.data || data) 
    } catch (error: unknown) { // <-- FIX: 'any' -> 'unknown'
      console.error(error)
      alert("Gagal memuat campaign.")
    } finally {
      setIsLoading(false)
    }
  }, [apiUrl]) // <-- 'apiUrl' jadi dependency

  // FIX 2: Tambahkan 'fetchCampaigns' ke dependency array
  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns]) // <-- Ini memperbaiki warning 'exhaustive-deps'

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
      fetchCampaigns() 
      
    // FIX 3: Ganti 'any' menjadi 'unknown'
    } catch (error: unknown) { 
      console.error(error)
      let message = "Gagal menghapus data";
      if (error instanceof Error) {
        message = error.message;
      }
      alert("Error: " + message)
    }
  }

  const handleSuccess = () => {
    setSelectedCampaign(null) 
    fetchCampaigns() 
  }

  if (isLoading) return <div className="p-6 text-slate-600">Loading campaigns...</div>

  return (
    <div className="p-6">
      <DonationsHeader onAddCampaign={() => setSelectedCampaign({})} />

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={() => setSelectedCampaign(campaign)}
              onDelete={() => handleDelete(campaign.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {selectedCampaign && (
        <CampaignFormModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  )
}