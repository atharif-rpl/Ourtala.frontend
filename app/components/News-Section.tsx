"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

// =========================================================================
// INTERFACE
// =========================================================================

// Interface untuk data mentah dari API CNN Indonesia
interface ApiArticleData {
  link: string;
  title: string;
  isoDate: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  contentSnippet: string;
}

// Interface internal yang akan digunakan oleh komponen kita
interface Article {
  url: string;
  title: string;
  publishedAt: string;
  urlToImage: string | null;
  description: string | null;
  content: string | null; // Digunakan di modal
  source: {
    name: string;
  };
}

// =========================================================================
// 1. Komponen Modal (Popup) - TEMA EMERALD
// =========================================================================
interface NewsModalProps {
  article: Article | null
  onClose: () => void
}

function NewsModal({ article, onClose }: NewsModalProps) {
  if (!article) return null

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  
  const fullContent = article.content || article.description || "Ringkasan berita tidak tersedia. Silakan klik tombol di bawah untuk membaca artikel lengkap di sumber aslinya."

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform scale-100 transition-transform duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 border-b border-emerald-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {article.title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {article.urlToImage && (
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image src={article.urlToImage} alt={article.title} fill className="object-cover" />
            </div>
          )}

          <p className="text-sm text-gray-500 mb-4 border-b pb-4">
            <span className="font-semibold text-emerald-600">{article.source.name}</span> - {publishedDate}
          </p>

          <p className="text-gray-700 whitespace-pre-line">
            {fullContent}
          </p>
        </div>

        {/* Footer Modal (Call to Action) */}
        <div className="p-6 border-t border-emerald-100 sticky bottom-0 bg-white z-10">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 text-white py-3 rounded-full font-semibold text-center block hover:bg-emerald-700 transition-all duration-300"
          >
            Baca Artikel Lengkap
          </a>
        </div>
      </div>
    </div>
  )
}


function NewsCard({ article, onClick }: { article: Article, onClick: (article: Article) => void }) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  })

  return (
    <div 
      onClick={() => onClick(article)}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-emerald-100 cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-emerald-50 text-emerald-500 text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md uppercase">
            {article.source.name}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
          {article.description || "Klik untuk melihat ringkasan berita..."}
        </p>
        <div className="mt-auto pt-4 border-t border-emerald-50/50">
          <p className="text-xs text-gray-500 font-medium">
            Tanggal: <span className="text-gray-700 font-semibold">{publishedDate}</span>
          </p>
        </div>
      </div>
    </div>
  )
}


// =========================================================================
// 3. Komponen Utama Section
// =========================================================================
export default function EnvironmentalNewsSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null) 
  const sectionRef = useRef<HTMLElement>(null)

  // URL API CNN Indonesia yang Anda minta
  const NEWS_API_URL = "https://berita-indo-api.vercel.app/v1/cnn-news/";
  
 
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(NEWS_API_URL);

      if (!response.ok) {
        throw new Error(`Gagal mengambil data! Status: ${response.status}`);
      }

      const result = await response.json(); 
      const apiArticles: ApiArticleData[] = result.data || [];
      const tempArticles: Article[] = [];

      // Mapping data, menampilkan 4 berita pertama apa pun topiknya
      for (const article of apiArticles) {
        
          tempArticles.push({
            url: article.link,
            title: article.title,
            publishedAt: article.isoDate,
            urlToImage: article.image.large || article.image.medium || null,
            description: article.contentSnippet,
            content: article.contentSnippet, 
            source: {
              name: "CNN Indonesia" 
            }
          });
        
        // Batasi hanya 4 artikel
        if (tempArticles.length >= 4) break;
      }
      
      setArticles(tempArticles);

    } catch (err) { // Perbaikan: Menghilangkan ': any' dan menggunakan pengecekan tipe yang aman
      if (err instanceof Error) {
        console.error("Gagal mengambil berita:", err);
        setError(`Gagal memuat berita: ${err.message}. Pastikan API sudah aktif.`);
      } else {
        console.error("Gagal mengambil berita:", err);
        setError("Gagal memuat berita: Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [NEWS_API_URL]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          fetchNews()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNews])
  
  useEffect(() => {
      // Mengunci scroll saat modal terbuka
      if (selectedArticle) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, [selectedArticle]);


  return (
    <section
      id="cnn-news-section"
      ref={sectionRef}
      // TEMA EMERALD/LIME/TEAL
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden" 
    >
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-200/15 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
              Berita Terkini
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Sorotan
            <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
              CNN Indonesia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berita terbaru langsung dari CNN Indonesia.
          </p>
        </div>

        {/* Status Loading/Error */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-700">Memuat berita dari CNN...</p>
          </div>
        )}
        
        {error && (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-8 rounded-lg max-w-xl mx-auto mb-10">
                <p className="font-bold mb-2">Gagal Mengambil Berita!</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
        
        {/* Projects Grid Berita */}
        {!isLoading && articles.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {articles.map((article, index) => (
              <div
                key={article.url}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <NewsCard article={article} onClick={setSelectedArticle} />
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && !error && articles.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-700">Tidak ada artikel yang ditemukan saat ini di CNN Indonesia.</p>
            </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ingin tahu lebih banyak?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Klik pada kartu berita untuk membaca ringkasan cepat, atau muat ulang untuk berita terbaru.
            </p>
            <button
                onClick={() => fetchNews()} 
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Muat Ulang Berita
            </button>
          </div>
        </div>
      </div>
      
      <NewsModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </section>
  )
}