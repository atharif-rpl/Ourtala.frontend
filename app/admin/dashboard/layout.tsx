// app/admin/dashboard/layout.tsx
import Sidebar from './components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // **PENTING**: Di sini Anda harus menambahkan logika untuk proteksi rute.
  // Misalnya, periksa cookie atau session. Jika tidak ada, redirect ke '/admin/login'.
  // Karena ini Server Component, Anda bisa menggunakan `cookies()` dari `next/headers`.

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}