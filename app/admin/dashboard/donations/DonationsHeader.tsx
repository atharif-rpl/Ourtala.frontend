// /components/donations/DonationsHeader.tsx

import { Plus } from "lucide-react"

interface DonationsHeaderProps {
  onAddCampaign: () => void
}

export function DonationsHeader({ onAddCampaign }: DonationsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Manage Donations</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and track all donation campaigns</p>
      </div>
      <button
        onClick={onAddCampaign}
        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        Add Campaign
      </button>
    </div>
  )
}