import React from 'react'
import Image from "next/image"
import { ModalProps } from '../types'

export const ImageModal: React.FC<ModalProps> = ({
  selectedImage,
  filteredItems,
  onClose,
  onNext,
  onPrev
}) => {
  if (!selectedImage) return null

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96 md:h-[550px]">
          <Image
            src={selectedImage.image || "/placeholder.svg"}
            alt={selectedImage.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full hover:scale-105 transition-all duration-200 shadow-xl z-10 backdrop-blur-sm font-semibold"
          >
            Close
          </button>

          {/* Navigation buttons */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-xl z-10 backdrop-blur-sm hover:scale-105 transition-all duration-200 font-semibold"
              >
                Prev
              </button>
              <button
                onClick={onNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-xl z-10 backdrop-blur-sm hover:scale-105 transition-all duration-200 font-semibold"
              >
                Next
              </button>
            </>
          )}

          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-bold capitalize mb-4 inline-block shadow-lg">
              {selectedImage.category}
            </span>
            <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
            <p className="text-white/80 text-sm">{selectedImage.description}</p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-4">
            <span className="text-white text-2xl font-bold">🌱</span>
          </div>
          <p className="text-gray-600 text-lg font-light">
            Beautiful moments deserve to be cherished
          </p>
        </div>
      </div>
    </div>
  )
}