"use client"

import { useState, useEffect } from "react"

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0])

  useEffect(() => {
    function handleResize() {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    // Set initial size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
