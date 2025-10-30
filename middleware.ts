// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Fungsi "Penjaga"
export function middleware(request: NextRequest) {
  // 1. Ambil token (kunci) dari cookies browser
  const token = request.cookies.get('auth-token');

  // 2. Tentukan halaman yang mau dituju
  const { pathname } = request.nextUrl;

  // 3. JIKA: Mau ke dashboard TAPI TIDAK punya token
  if (pathname.startsWith('/admin/dashboard') && !token) {
    // Redirect ke halaman login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. JIKA: Mau ke halaman login TAPI SUDAH punya token
  if (pathname.startsWith('/login') && token) {
    // Redirect ke dashboard
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 5. Jika tidak ada masalah, biarkan lanjut
  return NextResponse.next();
}

// Tentukan path mana saja yang harus dijaga oleh "Penjaga" ini
export const config = {
  matcher: [
    '/admin/dashboard/:path*', // Semua halaman di dalam /admin/dashboard
    '/login',                   // Halaman login
  ],
};