"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Heart, LogOut } from "lucide-react"

// Array link navigasi yang sudah diperbaiki
const navLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manage Members", href: "/admin/dashboard/members", icon: Users },
  // PERBAIKAN: href diubah ke route, bukan nama file
  { name: "Manage Donations", href: "/admin/dashboard/donations", icon: Heart },
  { name: "Manage User", href: "/admin/dashboard/user", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Implementasi logout Anda di sini (contoh: hapus token)
    // localStorage.removeItem("authToken") 
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 flex flex-col bg-white text-slate-900 border-r border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-md bg-teal-600 flex items-center justify-center font-bold text-white text-sm">
            O
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Ourtala</h1>
        </div>
        <p className="text-xs text-slate-500 ml-12">Admin</p>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            // Logika untuk link aktif yang lebih baik (mencakup sub-route)
            // Contoh: /admin/dashboard/donations/new akan tetap menyorot "Manage Donations"
            const isActive =
              link.href === "/admin/dashboard"
                ? pathname === link.href
                : pathname.startsWith(link.href)

            const Icon = link.icon
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-medium text-sm transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}