"use client"

import Image from "next/image"

// Komponen ini hanya bertanggung jawab untuk menampilkan footer.
// Ini membuatnya bisa digunakan kembali di halaman mana pun.
export default function Footer() {
  return (
    // Mengurangi padding vertikal di layar kecil (py-12) agar tidak terlalu memakan tempat
    <footer className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Bagian Logo dan Deskripsi (di kolom pertama) */}
          {/* - `flex flex-col`: Menyusun gambar dan teks secara vertikal.
            - `items-center`: Memusatkan item-item tersebut di layar kecil/mobile.
            - `md:items-start`: Mengembalikan alignment ke kiri di layar medium ke atas.
          */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <Image
              src="/images/mascot/mascotpohon.webp"
              alt="Ourtala Mascot"
              width={240}
              height={240}
              className="h-60 w-auto mb-4"
              priority
            />
            {/* - `text-center`: Memusatkan teks paragraf di layar kecil.
              - `md:text-left`: Mengembalikan teks ke rata kiri di layar yang lebih besar.
            */}
            <p className="text-slate-600 text-sm max-w-xs text-center md:text-left">
              Misi kami adalah membawa inovasi berkelanjutan ke dalam kehidupan sehari-hari Anda.
            </p>
          </div>

          {/* Kolom Menu */}
          {/* - `text-center md:text-left`: Cara cepat untuk memusatkan semua teks (judul dan link)
              di dalam kolom ini pada layar mobile, dan meratakannya ke kiri di layar lebih besar.
          */}
          <div className="lg:col-span-1 text-center md:text-left">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Ourtala</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors text-sm">Galery</a></li>
            </ul>
          </div> 

          {/* Kolom Informasi */}
          <div className="lg:col-span-1 text-center md:text-left">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Informasi</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors text-sm">Tentang Kami</a></li>
              <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-slate-600 hover:text-amber-600 transition-colors text-sm">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Kolom Media Sosial */}
          <div className="lg:col-span-1 text-center md:text-left">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Ikuti Kami</h3>
            {/* - `flex justify-center`: Memusatkan tombol Instagram di layar kecil.
              - `md:justify-start`: Mengembalikan alignment tombol ke kiri di layar besar.
            */}
            <div className="flex justify-center md:justify-start">
              <a
                href="/admin/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-sm font-medium text-slate-700">@Ourtala.id</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Bawah Footer */}
        {/*
          Struktur di bawah ini sudah responsif. `flex-col` menumpuk elemen di mobile,
          dan `md:flex-row` membuatnya sejajar di layar lebih besar. Tidak perlu diubah.
        */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2025 Ourtala. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors text-sm">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}