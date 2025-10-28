"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X } from "lucide-react"

interface Member {
  id: number
  name: string
  role: string
  instagram: string
  imageUrl: string
}

const MemberFormModal = ({
  member,
  onClose,
  onSave,
}: { member: Partial<Member> | null; onClose: () => void; onSave: (member: Partial<Member>) => void }) => {
  const [formData, setFormData] = useState<Partial<Member>>({})

  useEffect(() => {
    if (member) {
      setFormData(member)
    }
  }, [member])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!member) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{member.id ? "Edit Member" : "Add New Member"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              placeholder="e.g., Web Developer"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
            <input
              name="instagram"
              value={formData.instagram || ""}
              onChange={handleChange}
              placeholder="Username (without @)"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ManageMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<Partial<Member> | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      // TODO: Replace with actual API call
      setMembers([
        {
          id: 1,
          name: "Atharif Pratama Budiman",
          role: "Web Developer",
          instagram: "athariff",
          imageUrl: "/abstract-profile.png",
        },
        {
          id: 2,
          name: "Jane Doe",
          role: "Project Manager",
          instagram: "janedoe",
          imageUrl: "/abstract-profile.png",
        },
      ])
      setIsLoading(false)
    }
    fetchMembers()
  }, [])

  const handleSaveMember = (memberData: Partial<Member>) => {
    if (memberData.id) {
      setMembers(members.map((m) => (m.id === memberData.id ? ({ ...m, ...memberData } as Member) : m)))
    } else {
      const newMember = { ...memberData, id: Date.now() } as Member
      setMembers([...members, newMember])
    }
    setSelectedMember(null)
  }

  const handleDeleteMember = (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  if (isLoading) {
    return <div className="p-6 text-slate-600">Loading members...</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => setSelectedMember({})}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {members.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm">No members yet. Add your first team member.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Instagram</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.imageUrl || "/placeholder.svg"}
                        alt={member.name}
                        className="w-8 h-8 rounded-full bg-slate-200"
                      />
                      <span className="text-sm font-medium text-slate-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{member.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">@{member.instagram}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedMember && (
        <MemberFormModal member={selectedMember} onClose={() => setSelectedMember(null)} onSave={handleSaveMember} />
      )}
    </div>
  )
}
