"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { teamMembers, divisions } from "../data/teamData"
import { useWindowSize } from "../hooks/useWindowSize"
import { TeamCarousel } from "./TeamCarousel"
import { TeamModal } from "./Team-Modal"
import type { TeamMember } from "../types/TeamMember"

export default function AnimatedTeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
  const [width] = useWindowSize()

  const cardsPerSlide = width < 768 ? 1 : 3

  const filteredMembers =
    activeFilter === "All" ? teamMembers : teamMembers.filter((member) => member.division === activeFilter)

  const totalSlides = Math.ceil(filteredMembers.length / cardsPerSlide)

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (activeFilter === "All" && !isAutoScrollPaused && totalSlides > 1) {
      autoScrollRef.current = setInterval(nextSlide, 4000)
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [activeFilter, isAutoScrollPaused, totalSlides, nextSlide])

  const handleMouseEnter = () => {
    setIsAutoScrollPaused(true)
  }

  const handleMouseLeave = () => {
    setIsAutoScrollPaused(false)
  }

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  return (
    <>
      <section
        id="team"
        ref={sectionRef}
        className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
          <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-block mb-4">
              <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-5 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
              Meet the
              <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
                {" "}
                Changemakers
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of passionate individuals is dedicated to creating a more sustainable and green future
              for communities worldwide.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-transparent">
            <div className="flex flex-nowrap justify-start md:justify-center mx-auto gap-3">
              {divisions.map((division) => (
                <button
                  key={division}
                  onClick={() => setActiveFilter(division)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm whitespace-nowrap ${
                    activeFilter === division
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white/80 text-emerald-600 border border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
                  }`}
                >
                  {division}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <TeamCarousel
            members={filteredMembers}
            currentIndex={currentIndex}
            cardsPerSlide={cardsPerSlide}
            width={width}
            onNext={nextSlide}
            onPrev={prevSlide}
            onGoToSlide={goToSlide}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onCardClick={handleCardClick}
          />

          {/* Join Team CTA */}
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Want to Join Our Mission?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We&apos;re always looking for passionate individuals who share our vision of creating sustainable
                communities. Join us in making a difference!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => console.log("View Open Positions button clicked!")}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  View Open Positions
                </button>
                <button
                  onClick={() => console.log("Contact Us button clicked!")}
                  className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TeamModal component */}
      {selectedMember && <TeamModal member={selectedMember} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </>
  )
}
