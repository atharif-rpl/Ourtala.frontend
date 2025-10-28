import { useEffect, useState, useRef } from "react"

export const useGalleryVisibility = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    // ✅ FIX: Copy ref to variable to avoid stale closure
    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      // ✅ FIX: Use the copied variable in cleanup
      if (currentSection) {
        observer.unobserve(currentSection)
      }
      observer.disconnect()
    }
  }, []) // ✅ Empty dependency array is correct here

  return { isVisible, sectionRef }
}