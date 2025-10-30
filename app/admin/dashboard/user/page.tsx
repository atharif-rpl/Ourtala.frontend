"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

// Tipe untuk User (sesuaikan jika perlu)
interface User {
  id: number;
  name: string;
  email: string;
  roles: { id: number; name: string }[]; // User bisa punya banyak role
}

// Tipe untuk Role
type Role = string;

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  
  // State untuk form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("auth-token");

  // --- 1. FUNGSI FETCH DATA (USERS & ROLES) ---
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Ambil daftar Users
      const usersRes = await fetch(`${apiUrl}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!usersRes.ok) throw new Error("Gagal mengambil data users");
      const usersData = await usersRes.json();
      setUsers(usersData);

      // Ambil daftar Roles (untuk dropdown)
      const rolesRes = await fetch(`${apiUrl}/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!rolesRes.ok) throw new Error("Gagal mengambil data roles");
      const rolesData = await rolesRes.json();
      setRoles(rolesData);
      if (rolesData.length > 0) {
        setSelectedRole(rolesData[0]); // Set default role di form
      }

    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        alert("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- 2. FUNGSI UNTUK HANDLERS ---
  const openAddModal = () => {
    setModalMode("add");
    setSelectedUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setSelectedRole(roles[0] || "");
    setError(null);
    setIsModalOpen(true);
  };
  
  // (Fungsi Edit akan kita tambahkan nanti jika perlu)

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Yakin mau hapus user ini? User tidak bisa dikembalikan.")) {
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Gagal menghapus user");
      }
      alert("User berhasil dihapus!");
      fetchData(); // Refresh data
    } catch (error: unknown) {
      if (error instanceof Error) alert("Error: " + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Hanya mode "add" untuk saat ini
    if (modalMode === "add") {
      try {
        const res = await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: selectedRole,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          let errorMsg = data.message || "Gagal membuat user.";
          if (data.errors) {
            // Gabungkan semua pesan error validasi
            errorMsg = Object.values(data.errors).flat().join(" ");
          }
          throw new Error(errorMsg);
        }

        alert("User baru berhasil dibuat!");
        setIsModalOpen(false);
        fetchData(); // Refresh data
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    // (Logika 'edit' bisa ditambahkan di sini nanti)
  };

  if (isLoading && users.length === 0) {
    return <div className="p-6 text-slate-600">Loading user management...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Buat, edit, dan atur role untuk user dashboard.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 text-white rounded-md font-semibold text-sm hover:bg-teal-700"
        >
          + Add New User
        </button>
      </div>

      {/* --- TABEL DAFTAR USER --- */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <table className="w-full table-auto">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    {user.roles.length > 0 ? user.roles[0].name : 'No Role'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  {/* Tambahkan tombol Edit Role nanti */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL UNTUK ADD/EDIT USER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {modalMode === 'add' ? 'Add New User' : 'Edit User'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm text-center">
                  {error}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-70"
                >
                  {isLoading ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

