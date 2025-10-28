// app/components/social/EnhancedSocialSection.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import SocialLinks from "./SocialLinks"
import ContactForm from "./ContactForm"
import MapLocation from "./MapLocation"

export default function EnhancedSocialSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleWhatsApp = () => {
    const message = "Halo! Saya tertarik dengan layanan Anda."
    window.open(`https://wa.me/6282110627537?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section id="social" ref={sectionRef} className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium border border-emerald-200 shadow-sm">
            Hubungi Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
            Terhubung Dengan
            <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent"> Komunitas Kami</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Temukan kami di berbagai platform sosial media dan jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left side: Social + Map */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Temukan Kami di Sosial Media</h3>
                <SocialLinks onWhatsApp={handleWhatsApp} />
                <MapLocation />
              </CardContent>
            </Card>
          </div>

          {/* Right side: Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-2xl h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Kirim Pesan</h3>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
