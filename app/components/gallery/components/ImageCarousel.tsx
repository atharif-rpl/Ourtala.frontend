import React from 'react'
import Image from "next/image"
import { CarouselProps } from '../types' // Pastikan path impor ini sesuai dengan struktur proyek Anda

export const ImageCarousel: React.FC<CarouselProps> = ({
  items,
  currentIndex,
  onNext,
  onPrev,
  onSelectImage,
  onIndexChange
}) => {
  const currentItem = items[currentIndex]

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg py-10 w-full">
        No images found for this category.
      </div>
    )
  }

  if (!currentItem) return null

  return (
    <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center max-w-6xl mx-auto">
      {/* Mascot */}
      <div className="hidden lg:block mr-[-80px] z-20 pointer-events-none">
        <Image
          src="/images/mascot/mascotpohon.webp"
          alt="Mascot explaining gallery"
          width={180}
          height={180}
          className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto"
        />
      </div>

      {/* Carousel */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-2xl border border-emerald-100 w-full transition-all duration-1000 delay-400">
        <div className="relative w-full h-[380px] md:h-[550px] overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 relative h-[380px] md:h-[550px]">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Konten Teks di Atas Gambar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <span className="bg-emerald-600 px-4 py-1.5 rounded-full text-sm font-medium capitalize mb-2 inline-block shadow-md">
                    {item.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-lg mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <button
                    onClick={() => onSelectImage(item)}
                    className="inline-flex items-center text-emerald-200 hover:text-white font-semibold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Navigasi */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all duration-200 text-sm font-semibold z-30"
          >
            Prev
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all duration-200 text-sm font-semibold z-30"
          >
            Next
          </button>
        </div>

        {/* Indikator Titik */}
        <div className="flex justify-center space-x-2 mt-4 md:mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onIndexChange(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-emerald-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}