// app/components/social/SocialLinks.tsx
"use client"

import { getPlatformIcon, getPlatformColorClass } from "./SocialIcons"

export default function SocialLinks({ onWhatsApp }: { onWhatsApp: () => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {/* Contoh 1 link, sisanya copy seperti ini */}
      <a
        href="https://instagram.com/ourtala.id"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("instagram")} text-white shadow-lg hover:scale-105 transition-all`}
      >
        {getPlatformIcon("instagram", "w-8 h-8 mb-2")}
        <span className="text-sm font-semibold">Instagram</span>
      </a>
      <a
                    href="https://open.spotify.com/show/0SJqqQ0KUbkh5R26oJCfS8?si=3004a3c1d0804611" // Ganti dengan URL Spotify Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("spotify")} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    {getPlatformIcon("spotify", "w-8 h-8 mb-2")}
                    <span className="text-sm font-semibold">Spotify</span>
                  </a>

                  <a
                    href="https://youtube.com/@ourtala" // Ganti dengan URL YouTube Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("youtube")} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    {getPlatformIcon("youtube", "w-8 h-8 mb-2")}
                    <span className="text-sm font-semibold">YouTube</span>
                  </a>

                  <a
                    href="https://tiktok.com/@ourtala.id" // Ganti dengan URL TikTok Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("tiktok")} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    {getPlatformIcon("tiktok", "w-8 h-8 mb-2")}
                    <span className="text-sm font-semibold">TikTok</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ourtala-id-70a371323/" // Ganti dengan URL LinkedIn Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("linkedin")} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    {getPlatformIcon("linkedin", "w-8 h-8 mb-2")}
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </a>

      {/* ...spotify, youtube, tiktok, linkedin */}

      <button
        onClick={onWhatsApp}
        className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${getPlatformColorClass("whatsapp")} text-white shadow-lg hover:scale-105 transition-all`}
      >
        {getPlatformIcon("whatsapp", "w-8 h-8 mb-2")}
        <span className="text-sm font-semibold">WhatsApp</span>
      </button>
    </div>
  )
}
