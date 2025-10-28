"use client"

import Image from "next/image"
import { useWindowSize } from "./hooks/useWindowSize"

interface Props {
  bloomEasing: number
  time: number
  isLoaded: boolean
}

// ... (Array photoSlots tetap sama)
const photoSlots = [
  { id: 1,  photoUrl: "/images/mascot/mascotbunga.webp", size: "large",  bloomDirection: { angle: 15,  distance: 600, curve: 0.3,  rotation: 45 } },
  { id: 2,  photoUrl: "/images/mascot/mascotpot.webp",   size: "medium", bloomDirection: { angle: 45,  distance: 520, curve: -0.2, rotation: -30 } },
  { id: 3,  photoUrl: "/images/mascot/mascotpohon.webp", size: "large",  bloomDirection: { angle: 75,  distance: 580, curve: 0.4,  rotation: 120 } },
  { id: 4,  photoUrl: "/images/mascot/mascotbunga.webp", size: "small",  bloomDirection: { angle: 105, distance: 500, curve: -0.1, rotation: -75 } },
  { id: 5,  photoUrl: "/images/mascot/mascotpot.webp",   size: "medium", bloomDirection: { angle: 135, distance: 550, curve: 0.25, rotation: 90 } },
  { id: 6,  photoUrl: "/images/mascot/mascotpohon.webp", size: "large",  bloomDirection: { angle: 165, distance: 620, curve: -0.3, rotation: -45 } },
  { id: 7,  photoUrl: "/images/mascot/mascotbunga.webp", size: "medium", bloomDirection: { angle: 195, distance: 540, curve: 0.35, rotation: 160 } },
  { id: 8,  photoUrl: "/images/mascot/mascotpot.webp",   size: "small",  bloomDirection: { angle: 225, distance: 510, curve: -0.15,rotation: 30 } },
  { id: 9,  photoUrl: "/images/mascot/mascotbunga.webp", size: "large",  bloomDirection: { angle: 255, distance: 590, curve: 0.2,  rotation: -90 } },
  { id: 10, photoUrl: "/images/mascot/mascotpot.webp",   size: "medium", bloomDirection: { angle: 285, distance: 530, curve: -0.25,rotation: 135 } },
  { id: 11, photoUrl: "/images/mascot/mascotpohon.webp", size: "small",  bloomDirection: { angle: 315, distance: 560, curve: 0.4,  rotation: -120 } },
  { id: 12, photoUrl: "/images/mascot/mascotbunga.webp", size: "medium", bloomDirection: { angle: 345, distance: 540, curve: -0.1, rotation: 75 } },
]

export default function FloatingMascots({ bloomEasing, time, isLoaded }: Props) {
  // <-- BARU: Panggil hook untuk mendapatkan lebar layar
  const { width } = useWindowSize()

  // <-- BARU: Jangan render apa-apa jika lebar belum terdeteksi (untuk mencegah error di server)
  if (!width) {
    return null
  }

  // <-- BARU: Tentukan apakah layar termasuk mobile atau tidak
  const isMobile = width < 768

  // <-- BARU: Tentukan nilai dinamis berdasarkan ukuran layar
  const baseRadius = isMobile ? 140 : 300 // Radius lingkaran lebih kecil di mobile
  const sizeScaleFactor = isMobile ? 0.7 : 1 // Faktor pengecil ukuran maskot
  const bloomScaleFactor = isMobile ? 0.45 : 1 // Faktor pengecil jarak terbang

  const getSizeValue = (size: string) => {
    let baseSize
    switch (size) {
      case "small":  baseSize = 110; break
      case "medium": baseSize = 160; break
      case "large":  baseSize = 210; break
      default:       baseSize = 130; break
    }
    // <-- DIUBAH: Kalikan ukuran dasar dengan faktor skala
    return baseSize * sizeScaleFactor
  }

  return (
    <div className="relative">
      {photoSlots.map((slot, index) => {
        const size = getSizeValue(slot.size)
        // const baseRadius = 300 // <-- DIHAPUS: Sudah didefinisikan di atas secara dinamis
        
        const angle = index * (360 / photoSlots.length) * (Math.PI / 180)
        const initialX = Math.cos(angle) * baseRadius
        const initialY = Math.sin(angle) * baseRadius
        
        const bloomAngle = (slot.bloomDirection.angle * Math.PI) / 180
        // <-- DIUBAH: Kalikan jarak terbang dengan faktor skala
        const bloomDistance = slot.bloomDirection.distance * bloomScaleFactor
        const curve = slot.bloomDirection.curve
        
        const bloomX = Math.cos(bloomAngle) * bloomDistance * bloomEasing
        const bloomY = Math.sin(bloomAngle) * bloomDistance * bloomEasing
        
        const curveOffset = curve * bloomEasing * 100
        const curvedX = bloomX + Math.sin(bloomAngle + Math.PI / 2) * curveOffset
        const curvedY = bloomY + Math.cos(bloomAngle + Math.PI / 2) * curveOffset
        
        const currentX = initialX + (curvedX - initialX) * bloomEasing
        const currentY = initialY + (curvedY - initialY) * bloomEasing
        
        const baseRotation = Math.sin(time * 0.3 + index * 0.5) * 3
        const bloomRotation = slot.bloomDirection.rotation * bloomEasing
        const totalRotation = baseRotation + bloomRotation
        
        const breathingScale = 1 + Math.sin(time * 2 + index * 0.8) * (bloomEasing * 0.1)

        return (
          <div
            key={slot.id}
            className={`absolute top-1/2 left-1/2 transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${totalRotation}deg) scale(${breathingScale})`,
              zIndex: 10 + index,
              willChange: "transform",
            }}
          >
            <div className="relative hover:scale-110 transition-all duration-300" style={{ width: size, height: size }}>
              <Image
                src={slot.photoUrl}
                alt={`Character ${slot.id}`}
                width={size}
                height={size}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-lg"
                {...(index < 4 ? { priority: true } : { loading: "lazy" })}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}