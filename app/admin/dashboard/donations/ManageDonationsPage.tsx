"use client"

// 1. IMPORT Cookies
import { useState, useEffect, useCallback } from "react"
import Cookies from "js-cookie" 
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

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true)
    
    // --- 2. Ambil Token ---
    const token = Cookies.get('auth-token'); 

    try {
      const res = await fetch(`${apiUrl}/donations`, { 
        cache: 'no-store',
        // --- 3. Tambahkan Headers ---
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
      
      if (!res.ok) {
        // Jika token tidak valid (401), redirect ke login
        if (res.status === 401) {
          window.location.href = '/admin/login'; // Paksa redirect
          return;
        }
        throw new Error("Gagal mengambil data")
      }
      
      const data = await res.json()
      setCampaigns(data.data || data) 
    } catch (error: unknown) {
      console.error(error)
      alert("Gagal memuat campaign.")
    } finally {
      setIsLoading(false)
    }
  }, [apiUrl]) 

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns]) 

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin mau hapus campaign ini?")) {
      return
    }

    // --- 4. Ambil Token ---
    const token = Cookies.get('auth-token');

    try {
      const res = await fetch(`${apiUrl}/donations/${id}`, {
        method: 'DELETE',
        // --- 5. Tambahkan Headers ---
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/admin/login';
          return;
        }
        const err = await res.json()
        throw new Error(err.message || "Gagal menghapus data")
      }

      alert('Campaign berhasil dihapus!')
      fetchCampaigns() 
      
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
    // ... (Seluruh JSX Anda tidak perlu diubah, biarkan apa adanya) ...
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
