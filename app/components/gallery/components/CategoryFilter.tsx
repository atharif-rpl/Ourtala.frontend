import React from 'react'
import { CategoryFilterProps } from '../types'

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isVisible
}) => {
  return (
    <div
      className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {categories.map((cat, idx) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize shadow-sm ${
            selectedCategory === cat
              ? "bg-emerald-600 text-white shadow-lg scale-105"
              : "bg-white/70 backdrop-blur-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-emerald-100"
          }`}
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}