export type GalleryItem = {
    id: number
    title: string
    category: string
    image?: string
    description?: string
  }
  
  export type Category = "all" | "gardens" | "community" | "workshops" | "events"
  
  export interface CarouselProps {
    items: GalleryItem[]
    currentIndex: number
    onNext: () => void
    onPrev: () => void
    onSelectImage: (item: GalleryItem) => void
    onIndexChange: (index: number) => void
  }
  
  export interface ModalProps {
    selectedImage: GalleryItem | null
    filteredItems: GalleryItem[]
    onClose: () => void
    onNext: () => void
    onPrev: () => void
  }
  
  export interface CategoryFilterProps {
    categories: Category[]
    selectedCategory: Category
    onCategoryChange: (category: Category) => void
    isVisible: boolean
  }