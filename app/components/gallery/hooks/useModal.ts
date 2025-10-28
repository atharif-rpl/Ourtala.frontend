import { useState, useCallback, useEffect } from "react"
import { GalleryItem } from '../types'

export const useModal = (filteredItems: GalleryItem[]) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const nextModalImage = useCallback(() => {
    if (selectedImage && filteredItems.length > 0) {
      const idx = filteredItems.findIndex((i) => i.id === selectedImage.id)
      if (idx !== -1) {
        setSelectedImage(filteredItems[(idx + 1) % filteredItems.length])
      }
    }
  }, [selectedImage, filteredItems])

  const prevModalImage = useCallback(() => {
    if (selectedImage && filteredItems.length > 0) {
      const idx = filteredItems.findIndex((i) => i.id === selectedImage.id)
      if (idx !== -1) {
        setSelectedImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length])
      }
    }
  }, [selectedImage, filteredItems])

  const closeModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  // ✅ FIX: Include all dependencies in the dependency array
  useEffect(() => {
    if (selectedImage && !filteredItems.some((i) => i.id === selectedImage.id)) {
      setSelectedImage(null)
    }
  }, [filteredItems, selectedImage]) // ✅ FIX: Added missing dependencies

  return {
    selectedImage,
    setSelectedImage,
    nextModalImage,
    prevModalImage,
    closeModal
  }
}
