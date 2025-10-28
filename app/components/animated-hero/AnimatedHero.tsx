"use client"

import { useEffect, useState } from "react"
import DecorativeLines from "./DecorativeLines"
import FloatingMascots from "./FloatingMascots"
import LogoCenter from "./LogoCenter"

export default function AnimatedHero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [time, setTime] = useState(0)
  const [isHeroVisible, setIsHeroVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    let frameId: number

    const animate = () => {
      setTime(Date.now() * 0.001)
      frameId = requestAnimationFrame(animate)
    }

    // delay agar animasi muncul smooth
    const heroTimer = setTimeout(() => setIsHeroVisible(true), 100)
    const loadTimer = setTimeout(() => setIsLoaded(true), 500)

    window.addEventListener("scroll", handleScroll)
    frameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frameId)
      clearTimeout(heroTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  const scatterProgress = Math.min(scrollY / 300, 1)
  const bloomEasing = 1 - Math.pow(1 - scatterProgress, 4)

  return (
    <section
      id="home"
      className={`relative min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50 overflow-hidden transition-opacity duration-700 ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <DecorativeLines scatterProgress={scatterProgress} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute transition-all duration-1000 ease-out"
            style={{ transform: `scale(${1 + bloomEasing * 0.1})` }}
          >
            <FloatingMascots
              bloomEasing={bloomEasing}
              time={time}
              isLoaded={isLoaded}
            />
            <LogoCenter scatterProgress={scatterProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}
