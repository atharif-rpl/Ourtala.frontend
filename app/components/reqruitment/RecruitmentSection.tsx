// /components/recruitment/RecruitmentSection.tsx

"use client"

import { useState } from "react"
import { Position } from "./types"
import { positions } from "./data"
import { RecruitmentHeader } from "./RecruitmentHeader"
import { PositionCard } from "./PositionCard"
import { PositionModal } from "./PositionModal"
import { RecruitmentCta } from "./RecruitmentCta"

export function RecruitmentSection() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <RecruitmentHeader />

        {/* Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {positions.map((position) => (
            <PositionCard key={position.id} position={position} onSelect={() => setSelectedPosition(position)} />
          ))}
        </div>

        <RecruitmentCta />
      </div>

      {/* Modal */}
      {selectedPosition && (
        <PositionModal position={selectedPosition} onClose={() => setSelectedPosition(null)} />
      )}
    </section>
  )
}