import { useState, useEffect, useCallback } from "react"
import { GalleryItem } from '../types'

export const useCarousel = (filteredItems: GalleryItem[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0
    )
  }, [filteredItems.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      filteredItems.length > 0
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : 0
    )
  }, [filteredItems.length])

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [nextImage])

  // Reset index when filtered items change
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [filteredItems])

  return {
    currentImageIndex,
    setCurrentImageIndex,
    nextImage,
    prevImage
  }
}