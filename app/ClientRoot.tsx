"use client" // <-- Ini adalah "Tubuh" (Client Component)

import { useState, useEffect } from "react"
import IntroAnimation from "./components/IntroAnimation" 
import AnimatedHero from "./components/animated-hero/AnimatedHero"
import { AnimatedGallery } from "./components/gallery"
import Footer from "./components/footer"
import NavBar from "./components/navbar"
import AnimatedSocialSection from "./components/social/EnhancedSocialSection"
import AnimatedNewsSection from "./components/News-Section"
import AnimatedAbout from "./components/animated-about"
import AnimatedTeamSection from "./components/team-section/components/AnimatedTeamSection"
import DonationSection from "./components/donation"
import { RecruitmentSection } from "./components/reqruitment/RecruitmentSection"

// 1. Import tipe 'DonationProject' (sesuaikan path)
import type { DonationProject } from "./components/donation/types";

// 2. Buat interface untuk menerima props dari "Otak"
interface ClientRootProps {
  projects: DonationProject[];
}

// 3. Terima 'projects' sebagai props
export default function ClientRoot({ projects }: ClientRootProps) {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroAnimationComplete = () => {
    setShowIntro(false) 
  }

  // Logika 'overflow' Anda sudah benar
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showIntro])

  return (
    <main>
      {showIntro ? (
        <IntroAnimation onAnimationComplete={handleIntroAnimationComplete} />
      ) : (
        <>
          <NavBar />
          <AnimatedHero />
          <AnimatedAbout />
          <RecruitmentSection />
          <AnimatedNewsSection />
          <AnimatedTeamSection />
          
          {/* 4. Berikan 'projects' ke DonationSection */}
          <DonationSection projects={projects} />  
          
          <AnimatedGallery />
          <AnimatedSocialSection />
          <Footer/> 
        </>
      )}
    </main>
  )
}