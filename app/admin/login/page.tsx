// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Jika validasi gagal (422) atau login salah (401)
        setError(data.message || "Email atau password salah.");
        setIsLoading(false);
        return;
      }

      // --- LOGIN SUKSES ---
      // 1. Simpan token di cookies (berlaku 1 hari)
      Cookies.set("auth-token", data.token, { expires: 1, secure: true, sameSite: 'strict' });

      // 2. Arahkan ke dashboard
      router.push("/admin/dashboard"); // Ganti jika path dashboard Anda beda

    } catch (err) {
      setError("Gagal terhubung ke server. Coba lagi nanti.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f4f4' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Dashboard Login
        </h1>

        {error && (
          <p style={{ color: 'red', background: '#ffeeee', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </p>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '0.75rem', background: '#0d9488', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}