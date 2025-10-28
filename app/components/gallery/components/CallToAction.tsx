import React from 'react'

interface CallToActionProps {
  isVisible: boolean
}

export const CallToAction: React.FC<CallToActionProps> = ({ isVisible }) => {
  return (
    <div
      className={`text-center mt-16 transition-all duration-1000 delay-600 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Want to See More?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore our full collection of moments and discover the beauty of our community&apos;s journey.
        </p>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md">
          Browse All Images
        </button>
      </div>
    </div>
  )
}