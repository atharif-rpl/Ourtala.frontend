"use client"

import { useState, useEffect } from "react"

const NavBar = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const logoRotation = Math.min(scrollY * 0.1, 360)
  const logoScale = isScrolled ? 0.9 : 1

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#news", label: "News" },
    { href: "#team", label: "Team" },
    { href: "#gallery", label: "Gallery" },
  ]

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out max-w-fit px-6 py-3 rounded-2xl border backdrop-blur-xl ${
          isScrolled
            ? "bg-white/95 shadow-2xl shadow-slate-900/10 border-white/20 animate-float"
            : "bg-white/80 shadow-xl shadow-slate-900/5 border-white/30"
        }`}
      >
        {/* ... (kode navbar utama tetap sama) ... */}
        <div className="container mx-auto flex items-center justify-between gap-8">
          <a
            href="#home"
            className="flex items-center justify-center w-12 h-12 relative group overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <picture>
              <source srcSet="/images/Logo/OURTALA.webp" type="image/webp" />
              <img
                src="/images/Logo/OURTALA.png"
                alt="OURTALA Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-lg transition-all duration-500 ease-out group-hover:drop-shadow-xl relative z-10"
                style={{
                  transform: `rotate(${logoRotation}deg) scale(${logoScale})`,
                  filter: isScrolled ? "brightness(1.1) contrast(1.1)" : "brightness(1)",
                }}
              />
            </picture>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-slate-900 font-medium text-sm tracking-wide relative transition-all duration-300 ease-out group py-2"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 w-0 group-hover:w-full transition-all duration-400 ease-out rounded-full"></span>
                <span className="absolute inset-0 bg-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg -m-2"></span>
              </a>
            ))}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 rounded-xl hover:bg-slate-100/60 transition-all duration-300 ease-out group relative overflow-hidden"
            aria-label="Toggle mobile menu"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ease-out relative z-10 ${
                isMobileMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

    

      {/* Mobile Menu */}
      <div
        // TAMBAHKAN z-40 DI SINI
        className={`md:hidden z-40 fixed top-20 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 border border-white/20 transition-all duration-400 ease-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100 py-6 scale-100" : "max-h-0 opacity-0 py-0 scale-95"
        }`}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col space-y-2 px-4">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="block w-full text-center px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all duration-300 ease-out font-medium text-sm tracking-wide group relative overflow-hidden"
              style={{
                animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 to-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default NavBar