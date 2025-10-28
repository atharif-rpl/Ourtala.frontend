"use client"

import { useState, useEffect } from "react"
// Komponen Image dari Next.js tidak lagi dibutuhkan di sini
// import Image from "next/image" 

interface IntroAnimationProps {
  onAnimationComplete: () => void
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [animationStep, setAnimationStep] = useState("start")
  const [showShockwave, setShowShockwave] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep("slam"), 100)
    const timer2 = setTimeout(() => {
      setAnimationStep("vibrate")
      setShowShockwave(true)
    }, 1300)
    const timer3 = setTimeout(() => setAnimationStep("burst"), 2800)
    const timer4 = setTimeout(onAnimationComplete, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onAnimationComplete])

  const getLogoAnimationClass = () => {
    switch (animationStep) {
      case "slam": return "animate-intro-slam"
      case "vibrate": return "animate-intro-vibrate"
      case "burst": return "animate-intro-burst"
      default: return "opacity-0"
    }
  }

  const getBgElementClass = () => {
    if (animationStep === "slam") return "animate-bg-burst-anim"
    if (animationStep === "vibrate") return "animate-bg-float-anim"
    if (animationStep === "burst") return "animate-bg-exit-anim"
    return "opacity-0"
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-emerald-50 to-lime-50 z-50 transition-all duration-700 ease-in-out ${
        animationStep === "burst" ? "animate-bg-exit-anim" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {showShockwave && (
          <div className="absolute w-1 h-1 bg-transparent rounded-full animate-shockwave-anim" style={{ zIndex: 55 }} />
        )}

        {/* Elemen latar belakang */}
        <div className={`absolute w-24 h-24 bg-emerald-300/70 rounded-full blur-xl ${getBgElementClass()}`}
             style={{ top: "10%", left: "15%", animationDelay: "0.1s" }} />
        <div className={`absolute w-32 h-32 bg-teal-300/60 rounded-full blur-2xl ${getBgElementClass()}`}
             style={{ bottom: "20%", right: "10%", animationDelay: "0.2s" }} />
        <div className={`absolute w-20 h-20 bg-lime-300/80 rounded-full blur-lg ${getBgElementClass()}`}
             style={{ top: "40%", right: "25%", animationDelay: "0.3s" }} />
        <div className={`absolute w-28 h-28 bg-emerald-200/50 rounded-full blur-xl ${getBgElementClass()}`}
             style={{ bottom: "10%", left: "30%", animationDelay: "0.4s" }} />

        {/* Partikel */}
        {animationStep === "burst" &&
          Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30
            const distance = 150
            const endX = Math.cos((angle * Math.PI) / 180) * distance
            const endY = Math.sin((angle * Math.PI) / 180) * distance

            const particleStyle = {
              "--tw-particle-end-x": `${endX}px`,
              "--tw-particle-end-y": `${endY}px`,
              animationDelay: `${Math.random() * 0.1}s`,
              zIndex: 54,
            } as React.CSSProperties

            return (
              <div
                key={i}
                className="absolute w-3 h-3 bg-amber-400 rounded-full animate-particle-burst-anim"
                style={particleStyle}
              />
            )
          })}

        <div className="relative z-50">
          <div className={getLogoAnimationClass()}>
            {/* --- PERUBAHAN DI SINI --- */}
            {/* Menggunakan tag <picture> untuk optimasi gambar logo */}
            <picture>
              <source srcSet="/images/Logo/OURTALA.webp" type="image/webp" />
              <img
                src="/images/Logo/OURTALA.png"
                alt="Ourtala Logo"
                width={208}
                height={208}
                className="object-contain drop-shadow-lg"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  )
}
