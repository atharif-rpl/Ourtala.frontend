// File: app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ambil API key dari environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Ambil data (name, email, message) dari body request
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    // Validasi sederhana
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Data tidak lengkap." },
        { status: 400 }
      );
    }

    // 2. Kirim email menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: "Ourtala Contact Form <admin@ourtala.id>", // diperbaiki titik
      to: ["admin@ourtala.id"],                         // tujuan email
      subject: `Pesan Baru dari Website Ourtala dari ${name}`,
      replyTo: email, // Agar saat Anda membalas, email langsung terkirim ke pengirim
      html: `
        <h1>Pesan dari Form Kontak</h1>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Jika ada error dari Resend
    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

  // 3. Kirim respons sukses kembali ke frontend
return NextResponse.json(
  {
    status: "success",
    title: "Berhasil ✨",
    message: "Pesan Anda sudah terkirim. Terima kasih!",
    data,
  },
  { status: 200 }
);

} catch (err) {
  const errorMsg =
    err instanceof Error ? err.message : "Kesalahan tidak diketahui";

  console.error("Server Error:", errorMsg);

  return NextResponse.json(
    {
      status: "error",
      title: "Gagal ❌",
      message: "Terjadi masalah pada server, silakan coba lagi nanti.",
      detail: process.env.NODE_ENV === "development" ? errorMsg : undefined,
    },
    { status: 500 }
  );
}


}
