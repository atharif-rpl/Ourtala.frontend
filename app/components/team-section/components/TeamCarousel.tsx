"use client"

import { useCallback } from "react"
import type { TeamMember } from "../types/TeamMember"
import { TeamCard } from "./TeamCard"

interface TeamCarouselProps {
  members: TeamMember[]
  currentIndex: number
  cardsPerSlide: number
  width: number
  onNext: () => void
  onPrev: () => void
  onGoToSlide: (index: number) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onCardClick?: (member: TeamMember) => void
}

export function TeamCarousel({
  members,
  currentIndex,
  cardsPerSlide,
  width,
  onNext,
  onPrev,
  onGoToSlide,
  onMouseEnter,
  onMouseLeave,
  onCardClick,
}: TeamCarouselProps) {
  const localTotalSlides = Math.ceil(members.length / cardsPerSlide)
  const isMobile = width < 768

  const nextSlide = useCallback(() => {
    onNext()
  }, [onNext])

  const prevSlide = useCallback(() => {
    onPrev()
  }, [onPrev])

  const goToSlide = (index: number) => {
    onGoToSlide(index)
  }

  return (
    <div className="mb-12 relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${localTotalSlides * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / localTotalSlides}%)`,
          }}
        >
          {Array.from({ length: localTotalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className={`flex px-3 ${isMobile ? "justify-center" : "gap-6 justify-center"}`}
              style={{ width: `${100 / localTotalSlides}%` }}
            >
              {members.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((member) => (
                <div key={member.id} className="w-full max-w-[300px] flex-shrink-0">
                  <TeamCard member={member} onCardClick={onCardClick} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {localTotalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[-1rem] md:left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-emerald-600 p-2 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-1rem] md:right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-emerald-600 p-2 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {localTotalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: localTotalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index ? "w-8 h-3 bg-emerald-600" : "w-3 h-3 bg-emerald-200 hover:bg-emerald-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
