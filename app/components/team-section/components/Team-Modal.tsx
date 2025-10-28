"use client"

import Image from "next/image"
import type { TeamMember } from "../types/TeamMember"
import { useEffect } from "react"

interface TeamModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

export function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  // Lock scroll saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Tutup modal jika tekan ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Gambar */}
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <Image
              src={member.image || "/placeholder.svg?height=400&width=400"}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 flex gap-1">
              <div className="w-1 h-1 bg-accent rounded-full sparkle"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full sparkle"></div>
              <div className="w-1 h-1 bg-accent rounded-full sparkle"></div>
            </div>
          </div>

          {/* Konten */}
          <div className="md:w-1/2 p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">{member.name}</h2>
              <p className="text-lg font-medium text-primary">{member.role}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{member.division}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">About</h3>
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {member.role.includes("Frontend") && (
                  <>
                    <Tag text="React" color="emerald" />
                    <Tag text="TypeScript" color="emerald" />
                    <Tag text="CSS" color="emerald" />
                  </>
                )}
                {member.role.includes("Backend") && (
                  <>
                    <Tag text="Node.js" color="blue" />
                    <Tag text="Database" color="blue" />
                    <Tag text="API" color="blue" />
                  </>
                )}
                {member.role.includes("Designer") && (
                  <>
                    <Tag text="Figma" color="amber" />
                    <Tag text="UI/UX" color="amber" />
                    <Tag text="Prototyping" color="amber" />
                  </>
                )}
                {member.role.includes("Product") && (
                  <>
                    <Tag text="Strategy" color="teal" />
                    <Tag text="Analytics" color="teal" />
                    <Tag text="Roadmap" color="teal" />
                  </>
                )}
                {member.role.includes("Data") && (
                  <>
                    <Tag text="Python" color="green" />
                    <Tag text="ML" color="green" />
                    <Tag text="Analytics" color="green" />
                  </>
                )}
                {member.role.includes("DevOps") && (
                  <>
                    <Tag text="AWS" color="cyan" />
                    <Tag text="Docker" color="cyan" />
                    <Tag text="CI/CD" color="cyan" />
                  </>
                )}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Connect</h3>
              <div className="flex gap-3">
                {member.social.linkedin && (
                  <SocialIcon href={member.social.linkedin} className="text-blue-600">
                    {/* LinkedIn icon */}
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </SocialIcon>
                )}

                {member.social.instagram && (
                  <SocialIcon
                    href={member.social.instagram}
                    className="text-pink-600"
                    onClick={(e) => e.stopPropagation()} // cegah modal tertutup
                  >
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
                  </SocialIcon>
                )}

                {member.social.twitter && (
                  <SocialIcon href={member.social.twitter} className="text-blue-500">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </SocialIcon>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Komponen kecil untuk tag skill
function Tag({ text, color }: { text: string; color: string }) {
  return (
    <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-sm`}>
      {text}
    </span>
  )
}

// Komponen kecil untuk icon social
function SocialIcon({
  href,
  className,
  children,
  onClick,
}: {
  href: string
  className: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 hover:scale-110 shadow-sm"
      onClick={onClick}
    >
      <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  )
}
