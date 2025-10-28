// src/components/sections/donation/index.tsx
"use client";

import { useMemo, useState } from "react";
import { DonationProject } from "./types";
import { DonationHeader } from "./components/DonationHeader";
import { DonationCard } from "./components/DonationCard";
import { DonationDetailDialog } from "./components/DonationDetailDialog";

// 1. BUAT INTERFACE UNTUK MENERIMA PROPS
interface DonationSectionProps {
  projects: DonationProject[]; // "Tangan" akan diberi data 'projects'
}

// 2. TERIMA PROPS 'projects'
export default function DonationSection({ projects }: DonationSectionProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DonationProject | null>(null);

  // 3. 'useMemo' akan otomatis menghitung berdasarkan 'projects' yang diterima
  const totals = useMemo(() => {
    const goal = projects.reduce((s, p) => s + p.goal, 0);
    const raised = projects.reduce((s, p) => s + p.raised, 0);
    const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
    return { goal, raised, percent };
  }, [projects]); // 'projects' sekarang adalah dependency

  // ... (Semua fungsi Anda yang lain: openModal, handleDonate, dll. SAMA PERSIS) ...
  const openModal = (project: DonationProject) => {
    setSelected(project);
    setOpen(true);
  };

  const handleDonate = (project: DonationProject) => {
    alert(`Donate to "${project.title}". Hubungi WA untuk metode pembayaran.`);
  };

  const handleWhatsApp = (project: DonationProject) => {
    const number = project.waNumber || "6281234567890";
    const text = encodeURIComponent(
      `Halo, saya tertarik berdonasi untuk program "${project.title}". Mohon info lebih lanjut ya.`,
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="donation" className="py-20 ...">
      {/* ... (background shapes Anda) ... */}
      <div className="container mx-auto px-4 relative z-10">
        <DonationHeader
          totalGoal={totals.goal}
          totalRaised={totals.raised}
          overallPercent={totals.percent}
        />
        
        {/* 4. 'projects.map' akan me-render data asli dari props */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <DonationCard
              key={p.id}
              project={p}
              onCardClick={openModal}
              onDonateClick={handleDonate}
              onWhatsAppClick={handleWhatsApp}
            />
          ))}
        </div>
      </div>

      <DonationDetailDialog
        open={open}
        onOpenChange={setOpen}
        project={selected}
        onDonateClick={handleDonate}
        onWhatsAppClick={handleWhatsApp}
      />
    </section>
  );
}