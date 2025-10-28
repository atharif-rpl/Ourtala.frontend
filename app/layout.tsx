// File: app/layout.tsx

import type { Metadata } from "next"
// 1. Impor font Modak bersama dengan font lainnya
import { Geist, Geist_Mono, Modak } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// 2. Konfigurasi font Modak
const modak = Modak({
  variable: "--font-modak",
  subsets: ["latin"],
  weight: "400", // Font Modak hanya punya satu weight: 400
})

export const metadata: Metadata = {
  title: "Ourtala",
  description: "Ourtala official web",
  icons: {
    icon: "/favicon.png",            
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", 
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 3. Tambahkan variabel font Modak ke body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${modak.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        {children}

        {/* Toaster agar toast bisa dipanggil dari mana saja */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: "12px", padding: "16px" },
            duration: 4000,
          }}
        />
      </body>
    </html>
  )
}
