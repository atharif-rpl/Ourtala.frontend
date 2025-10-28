// /components/donations/EmptyState.tsx

import { Heart } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No campaigns yet</p>
      <p className="text-sm text-slate-500 mt-1">Create your first donation campaign</p>
    </div>
  )
}