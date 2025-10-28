import React from 'react'

interface GalleryHeaderProps {
  isVisible: boolean
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ isVisible }) => {
  return (
    <div
      className={`text-center mb-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="inline-block mb-4">
        <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium uppercase border border-emerald-200 shadow-sm">
          Our Gallery
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Stories in{" "}
        <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
          Pictures
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Explore the journey of our community as we transform spaces, educate minds,
        and grow together towards a sustainable future.
      </p>
    </div>
  )
}
