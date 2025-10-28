// /components/donations/CampaignCard.tsx

import { Heart, Pencil, Trash2 } from "lucide-react"
import type { DonationCampaign } from "./types"

interface CampaignCardProps {
  campaign: DonationCampaign
  onEdit: () => void
  onDelete: () => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)
}

export function CampaignCard({ campaign, onEdit, onDelete }: CampaignCardProps) {
  const progress = (campaign.amountCollected / campaign.amountTarget) * 100
  const statusColors = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    closed: "bg-slate-100 text-slate-700 border-slate-200",
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-slate-100 overflow-hidden">
        <img src={campaign.imageUrl || "/placeholder.svg"} alt={campaign.title} className="w-full h-full object-cover" />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium border ${statusColors[campaign.status]}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">{campaign.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{campaign.location}</p>
          </div>
          <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
        </div>
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">{campaign.description}</p>
        <div className="mb-3">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-teal-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium text-slate-900">{formatCurrency(campaign.amountCollected)}</span>
            <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="flex gap-2 pt-3 border-t border-slate-200">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded transition-colors">
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}