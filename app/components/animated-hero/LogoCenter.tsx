"use client"

import Image from "next/image"

interface Props {
  scatterProgress: number
}

export default function LogoCenter({ scatterProgress }: Props) {
  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-1000 ease-out"
      style={{
        opacity: 1 - scatterProgress * 0.5,
        transform: `translate(-50%, -50%) scale(${1 - scatterProgress * 0.4})`,
        willChange: "transform, opacity",
      }}
    >
      <div className="text-center relative">
        <Image
          src="/images/Logo/OURTALA.webp"
          alt="OurTala Logo"
          width={176}
          height={176}
          priority
          className="mx-auto drop-shadow-2xl mb-4 h-36 md:h-44 w-auto"
        />
        <h2 className="text-7xl md:text-9xl font-modak tracking-wider bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
          OURTALA
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-2 font-light">
          Sustainable Innovation
        </p>
      </div>
    </div>
  )
}
