"use client"

import { useState } from "react"
import { Category } from "./types"
import { categories, galleryItems } from "./data/galleryData"
import { useGalleryVisibility } from "./hooks/useGalleryVisibility"
import { useCarousel } from "./hooks/useCarousel"
import { useModal } from "./hooks/useModal"
import { GalleryHeader } from "./components/GalleryHeader"
import { CategoryFilter } from "./components/CategoryFilter"
import { ImageCarousel } from "./components/ImageCarousel"
import { ImageModal } from "./components/ImageModal"
import { CallToAction } from "./components/CallToAction"
import { BackgroundBubbles } from "./components/BackgroundBubbles"

export default function AnimatedGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  
  // Custom hooks
  const { isVisible, sectionRef } = useGalleryVisibility()
  
  // Filter items based on selected category
  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter((item) => item.category === selectedCategory)
  
  const { currentImageIndex, setCurrentImageIndex, nextImage, prevImage } = useCarousel(filteredItems)
  const { selectedImage, setSelectedImage, nextModalImage, prevModalImage, closeModal } = useModal(filteredItems)

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
    >
      <BackgroundBubbles />

      <div className="container mx-auto px-4 relative z-10">
        <GalleryHeader isVisible={isVisible} />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isVisible={isVisible}
        />

        <ImageCarousel
          items={filteredItems}
          currentIndex={currentImageIndex}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectImage={setSelectedImage}
          onIndexChange={setCurrentImageIndex}
        />

        <CallToAction isVisible={isVisible} />
      </div>

      <ImageModal
        selectedImage={selectedImage}
        filteredItems={filteredItems}
        onClose={closeModal}
        onNext={nextModalImage}
        onPrev={prevModalImage}
      />
    </section>
  )
}