import type React from "react"
import { useState, useEffect } from "react"
import type { DonationCampaign } from "./types"

interface CampaignFormModalProps {
  campaign: Partial<DonationCampaign> | null
  onClose: () => void
  onSuccess: () => void
}

export function CampaignFormModal({ campaign, onClose, onSuccess }: CampaignFormModalProps) {
  const isEditMode = !!campaign?.id
  const [formData, setFormData] = useState<Partial<DonationCampaign>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // FIX 1: Tipe 'any' diganti dengan tipe yang benar
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    if (isEditMode) {
      setFormData(campaign)
      setImagePreview(campaign.imageUrl || null)
      setImageFile(null) 
    } else {
      setFormData({ status: "active" })
      setImagePreview(null)
      setImageFile(null)
    }
  }, [campaign, isEditMode]) 

  const formatRupiah = (value: number | string) => {
    const num = typeof value === "number" ? value : Number(String(value).replace(/\D/g, ""))
    if (isNaN(num)) return ""
    return "Rp " + num.toLocaleString("id-ID")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isNumber = type === "number"
    setFormData((prev) => ({ ...prev, [name]: isNumber ? Number(value) : value }))
  }

  const handleRupiahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value.replace(/\D/g, "")
    setFormData((prev) => ({ ...prev, [name]: Number(numericValue) }))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file) 
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors(null)

    const data = new FormData()
    data.append("title", formData.title || "")
    data.append("location", formData.location || "")
    data.append("description", formData.description || "")
    data.append("whatsapp_link", formData.whatsappLink || "")
    data.append("status", formData.status || "active")
    data.append("amount_collected", String(formData.amountCollected || 0))
    data.append("target_amount", String(formData.amountTarget || 0))

    if (imageFile) {
      data.append("image", imageFile)
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    let endpoint = `${apiUrl}/donations`
    
    // FIX 2: Variabel 'method' tidak pernah dipakai, jadi kita hapus
    // let method = "POST" // <-- BARIS INI DIHAPUS

    if (isEditMode) {
      endpoint = `${apiUrl}/donations/${campaign!.id}`
      data.append("_method", "PUT")
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST", 
        body: data,
        headers: {
          "Accept": "application/json",
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        setErrors(errorData.errors) 
        throw new Error(errorData.message || "Gagal menyimpan data")
      }

      onSuccess() 

    // FIX 3: Tipe 'any' diganti dengan 'unknown' + 'instanceof'
    } catch (error: unknown) { 
      console.error("Gagal submit:", error)
      let message = "Terjadi kesalahan";
      if (error instanceof Error) {
        message = error.message;
      }
      alert("Error: " + message)
    } finally {
      setIsLoading(false)
    }
  }

  // --- RENDER JSX ---
  // (JSX Anda tidak ada error, jadi tidak perlu diubah)
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      {/* ... (seluruh JSX Anda dari <div className="bg-white..."> ... </form> ... </div>) ... */}
    </div>
  )
}