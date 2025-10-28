// /components/recruitment/PositionCard.tsx

import { ArrowRight } from "lucide-react"
import { Position } from "./types"

interface PositionCardProps {
  position: Position
  onSelect: () => void
}

export function PositionCard({ position, onSelect }: PositionCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group text-left transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br">
          <img
            src={position.image || "/placeholder.svg"}
            alt={position.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">{position.type}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white font-bold text-lg flex items-center gap-2 justify-center">
              Lihat Detail <ArrowRight size={20} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <p className="text-emerald-600 text-sm font-bold uppercase tracking-wide mb-2">{position.division}</p>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">{position.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{position.shortDesc}</p>
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {/* <span className="text-emerald-600 font-bold text-sm">{position.salary}</span> */} {/* Salary hidden for now */}
            <span className="text-slate-400 text-xs">Klik untuk detail</span>
          </div>
        </div>
      </div>
    </button>
  )
}