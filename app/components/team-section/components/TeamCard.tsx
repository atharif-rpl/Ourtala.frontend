"use client"

import Image from "next/image"
import type { TeamMember } from "../types/TeamMember"
import { useState } from "react"

interface TeamCardProps {
  member: TeamMember
  index?: number
  onCardClick?: (member: TeamMember) => void
}

const cardColors = [
  "bg-emerald-50/80",
  "bg-blue-50/80",
  "bg-amber-50/80",
  "bg-teal-50/80",
  "bg-green-50/80",
  "bg-cyan-50/80",
]

const accentColors = [
  "text-emerald-700",
  "text-blue-700",
  "text-amber-700",
  "text-teal-700",
  "text-green-700",
  "text-cyan-700",
]

export function TeamCard({ member, index = 0, onCardClick }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardColor = cardColors[index % cardColors.length]
  const accentColor = accentColors[index % accentColors.length]

  const handleClick = () => {
    onCardClick?.(member)
  }

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`
          relative overflow-hidden rounded-3xl ${cardColor} backdrop-blur-sm
          transform transition-all duration-500 ease-out
          ${isHovered ? "scale-105 shadow-2xl shadow-emerald-900/10" : "shadow-lg shadow-emerald-900/5"}
          w-72 h-96 border border-white/20
        `}
      >
        {/* Sparkle */}
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="w-1 h-1 bg-accent rounded-full sparkle"></div>
          <div className="w-1.5 h-1.5 bg-accent rounded-full sparkle"></div>
          <div className="w-1 h-1 bg-accent rounded-full sparkle"></div>
        </div>

        {/* Foto member */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={member.image || "/placeholder.svg?height=300&width=300"}
            alt={member.name}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, 18rem"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground tracking-tight">
              {member.name}
            </h3>
            <p className={`text-sm font-medium ${accentColor}`}>{member.role}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {member.division}
            </p>
          </div>

          <p
            className={`
              text-sm text-muted-foreground leading-relaxed transition-all duration-300
              ${isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"}
            `}
          >
            {member.bio}
          </p>
        </div>

        {/* Social icon */}
        <div
          className={`
            absolute bottom-6 right-6 flex gap-3 transition-all duration-300
            ${isHovered ? "opacity-100 translate-x-0" : "opacity-60 translate-x-2"}
          `}
        >
          {member.social.linkedin && (
            <SocialButton
              href={member.social.linkedin}
              color="text-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </SocialButton>
          )}

          {member.social.instagram && (
            <SocialButton
              href={member.social.instagram}
              color="text-pink-600"
              onClick={(e) => e.stopPropagation()}
            >
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
            </SocialButton>
          )}
        </div>
      </div>
    </div>
  )
}

/* Reusable social icon button */
function SocialButton({
  href,
  color,
  children,
  onClick,
}: {
  href: string
  color: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
      onClick={onClick}
    >
      <svg className={`w-4 h-4 ${color}`} fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  )
}
