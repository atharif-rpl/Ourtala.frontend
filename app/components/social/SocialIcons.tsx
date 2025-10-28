// app/components/social/SocialIcons.tsx
import React from "react"
import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa"

export function getPlatformIcon(platform: string, size = "w-7 h-7") {
  switch (platform) {
    case "instagram":
      return <FaInstagram className={size} />
    case "spotify":
      return <FaSpotify className={size} />
    case "youtube":
      return <FaYoutube className={size} />
    case "tiktok":
      return <FaTiktok className={size} />
    case "linkedin":
      return <FaLinkedin className={size} />
    case "whatsapp":
      return <FaWhatsapp className={size} />
    default:
      return null
  }
}

export function getPlatformColorClass(platform: string) {
  switch (platform) {
    case "instagram":
      return "from-pink-500 to-yellow-500"
    case "spotify":
      return "from-green-500 to-emerald-600"
    case "youtube":
      return "from-red-500 to-rose-600"
    case "tiktok":
      return "from-gray-800 to-gray-900"
    case "linkedin":
      return "from-blue-600 to-sky-700"
    case "whatsapp":
      return "from-green-500 to-green-600"
    default:
      return "from-gray-400 to-gray-500"
  }
}
