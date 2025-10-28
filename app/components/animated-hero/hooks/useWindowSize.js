// file: hooks/useWindowSize.js
"use client"

import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Panggil sekali saat awal untuk mendapatkan ukuran awal
    handleResize();
    
    // Tambahkan event listener untuk memantau perubahan ukuran
    window.addEventListener("resize", handleResize);
    
    // Cleanup function untuk menghapus event listener saat komponen dibongkar
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array kosong memastikan efek ini hanya berjalan sekali saat mount

  return windowSize;
}