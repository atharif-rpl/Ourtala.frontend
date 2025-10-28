// app/admin/dashboard/donations/CampaignFormModal.tsx

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

    if (isEditMode) {
      endpoint = `${apiUrl}/donations/${campaign!.id}`
      data.append("_method", "PUT")
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST", 
        body: data,
        headers: { "Accept": "application/json" },
      })

      if (!res.ok) {
        const errorData = await res.json()
        setErrors(errorData.errors) 
        throw new Error(errorData.message || "Gagal menyimpan data")
      }
      onSuccess() 
    } catch (error: unknown) { 
      console.error("Gagal submit:", error)
      let message = "Terjadi kesalahan";
      if (error instanceof Error) { message = error.message; }
      alert("Error: " + message)
    } finally {
      setIsLoading(false)
    }
  }

  // --- RENDER JSX (INI BAGIAN PENTING YANG MUNGKIN HILANG) ---
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 z-10">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditMode ? "Edit Campaign" : "Add New Campaign"}
          </h2>
        </div>

        {/* --- PASTIKAN FORM INI ADA DAN TERHUBUNG --- */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors && errors.general && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{errors.general}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange} // <-- Terhubung ke handler
              placeholder="Contoh: Donasi Pembangunan Masjid Al-Ikhlas"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                errors?.title ? "border-red-500 ring-red-300" : "border-slate-300 focus:ring-teal-500"
              }`}
              required
            />
            {errors?.title && <p className="text-xs text-red-600 mt-1">{errors.title[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              name="location"
              value={formData.location || ""}
              onChange={handleChange} // <-- Terhubung ke handler
              placeholder="Contoh: Bandung, Jawa Barat"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange} // <-- Terhubung ke handler
              placeholder="Ceritakan tentang tujuan penggalangan dana ini..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // <-- Terhubung ke handler
              className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            {imagePreview && ( // <-- Terhubung ke state
              <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-md border" />
            )}
            {errors?.image && <p className="text-xs text-red-600 mt-1">{errors.image[0]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount Collected</label>
              <input
                name="amountCollected" 
                value={formData.amountCollected ? formatRupiah(formData.amountCollected) : ""} // <-- Terhubung
                onChange={handleRupiahChange} // <-- Terhubung
                placeholder="Contoh: Rp 1.000.000"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount</label>
              <input
                name="amountTarget" 
                value={formData.amountTarget ? formatRupiah(formData.amountTarget) : ""} // <-- Terhubung
                onChange={handleRupiahChange} // <-- Terhubung
                placeholder="Contoh: Rp 10.000.000"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                  errors?.target_amount ? "border-red-500 ring-red-300" : "border-slate-300 focus:ring-teal-500"
                }`}
              />
              {errors?.target_amount && <p className="text-xs text-red-600 mt-1">{errors.target_amount[0]}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Link</label>
            <input
              name="whatsappLink" 
              value={formData.whatsappLink || ""}
              onChange={handleChange} // <-- Terhubung
              placeholder="Contoh: https://wa.me/6281234567890"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status || "active"}
              onChange={handleChange} // <-- Terhubung
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose} // <-- Terhubung
              disabled={isLoading} // <-- Terhubung
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading} // <-- Terhubung
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:bg-teal-400"
            >
              {isLoading ? (isEditMode ? "Updating..." : "Saving...") : "Save Campaign"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}