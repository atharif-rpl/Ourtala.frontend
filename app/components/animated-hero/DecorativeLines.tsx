"use client"

interface Props {
  scatterProgress: number
}

export default function DecorativeLines({ scatterProgress }: Props) {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
        <path
          d="M-100,200 Q300,100 600,300 T1300,400"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeDasharray="2000"
          strokeDashoffset={2000 - scatterProgress * 2000}
          opacity={0.6}
        />
        <path
          d="M-50,600 Q400,500 800,650 T1400,550"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeDasharray="1800"
          strokeDashoffset={1800 - scatterProgress * 1800}
          opacity={0.5}
        />
        <path
          d="M1300,150 Q900,250 500,200 T-200,350"
          stroke="url(#gradient3)"
          strokeWidth="2.5"
          strokeDasharray="1600"
          strokeDashoffset={1600 - scatterProgress * 1600}
          opacity={0.4}
        />
        <path
          d="M200,50 Q600,150 1000,100 T1500,200"
          stroke="url(#gradient4)"
          strokeWidth="1.5"
          strokeDasharray="1400"
          strokeDashoffset={1400 - scatterProgress * 1400}
          opacity={0.3}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84CC16" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0D9488" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
