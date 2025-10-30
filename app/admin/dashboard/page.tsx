"use client"

import { useState, useEffect } from "react"
import { Heart, Users, UserCheck, TrendingUp } from "lucide-react"
import Cookies from "js-cookie"

// Tipe ini sudah cocok dengan 'DonationResource' dari Laravel
interface Campaign {
  id: number
  title: string
  location: string
  amountCollected: number
  amountTarget: number
  status: "active" | "completed" | "closed"
}

// Tipe ini tetap kita pakai (data bohongan, karena belum ada API-nya)
interface RecentMember {
  id: number
  name: string
  role: string
}

interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  totalDonations: number
  totalMembers: number // <-- Masih bohongan
  totalUsers: number // <-- Masih bohongan
  activeUsers: number // <-- Masih bohongan
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalDonations: 0,
    totalMembers: 0,
    totalUsers: 0,
    activeUsers: 0,
  })
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([])
  const [recentMembers, setRecentMembers] = useState<RecentMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(
      amount || 0, // Diberi '|| 0' untuk anti-NaN
    )
  }

  // --- MODIFIKASI DIMULAI DI SINI ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        
        // --- 1. Ambil Data Donasi ASLI ---
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const token = Cookies.get('auth-token');
        // (Pastikan error 'api/donations' not found Anda sudah beres)
        const res = await fetch(`${apiUrl}/donations`, 
        { cache: "no-store",
          headers: { // <-- TAMBAHKAN INI
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
         })
        if (!res.ok) {
          throw new Error("Gagal mengambil data donasi")
          
        }
        
        // Data dari Laravel (sudah di-sort 'latest()' oleh Controller)
        const data = await res.json()
        const campaigns: Campaign[] = data.data || []

        // --- 2. Hitung Statistik ASLI ---
        const totalCampaigns = campaigns.length
        const activeCampaigns = campaigns.filter((c) => c.status === "active").length
        const totalDonations = campaigns.reduce((acc, c) => acc + (Number(c.amountCollected) || 0), 0)

        // --- 3. Set Data Kampanye ASLI ---
        // Tampilkan 3 kampanye terbaru
        setRecentCampaigns(campaigns.slice(0, 3)) 

        // --- 4. Set Data Member (MASIH BOHONGAN) ---
        // (Kita belum buat API untuk ini, jadi biarkan data aslinya)
        setRecentMembers([
          {
            id: 1,
            name: "Atharif Pratama Budiman",
            role: "Web Developer",
          },
          {
            id: 2,
            name: "Jane Doe",
            role: "Project Manager",
          },
        ])

        // --- 5. Set SEMUA Stats (Gabungan Asli + Bohongan) ---
        setStats({
          // Stats ASLI dari API Donasi
          totalCampaigns: totalCampaigns,
          activeCampaigns: activeCampaigns,
          totalDonations: totalDonations,

          // Stats BOHONGAN dari kode asli Anda
          totalMembers: 2,
          totalUsers: 3,
          activeUsers: 3,
        })
      } catch (error) {
        console.error("Gagal fetch data dashboard:", error)
        // Anda bisa set state error di sini jika mau
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])
  // --- MODIFIKASI SELESAI DI SINI ---

  if (isLoading) {
    return <div className="p-6 text-slate-600">Loading dashboard...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here&apos;s your organization overview.</p>
      </div>

      {/* Stats Grid (Ini tidak perlu diubah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Donations Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-600">Total Donations</h3>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">{formatCurrency(stats.totalDonations)}</p>
          <p className="text-xs text-slate-500 mt-2">{stats.totalCampaigns} campaigns</p>
        </div>

        {/* Active Campaigns Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-600">Active Campaigns</h3>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">{stats.activeCampaigns}</p>
          <p className="text-xs text-slate-500 mt-2">Out of {stats.totalCampaigns} total</p>
        </div>

        {/* Team Members Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-600">Team Members</h3>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">{stats.totalMembers}</p>
          <p className="text-xs text-slate-500 mt-2">Active members</p>
        </div>

        {/* System Users Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-600">System Users</h3>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">{stats.activeUsers}</p>
          <p className="text-xs text-slate-500 mt-2">All active</p>
        </div>
      </div>

      {/* Recent Activity Section (Ini tidak perlu diubah) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Campaigns</h2>
          <div className="space-y-3">
            {recentCampaigns.length === 0 ? (
              <p className="text-sm text-slate-500">No campaigns yet</p>
            ) : (
              recentCampaigns.map((campaign) => {
                const progress =
                  (Number(campaign.amountCollected) || 0) / (Number(campaign.amountTarget) || 1) * 100 // Anti '0/0'
                return (
                  <div key={campaign.id} className="pb-3 border-b border-slate-200 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{campaign.title}</p>
                        <p className="text-xs text-slate-500">{campaign.location}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          campaign.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : campaign.status === "completed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-teal-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-600">{formatCurrency(campaign.amountCollected)}</span>
                      <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Recent Members (Ini tidak perlu diubah) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Team Members</h2>
          <div className="space-y-3">
            {recentMembers.length === 0 ? (
              <p className="text-sm text-slate-500">No members yet</p>
            ) : (
              recentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between pb-3 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}