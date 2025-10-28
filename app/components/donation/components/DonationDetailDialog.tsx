// src/components/sections/donation/components/DonationDetailDialog.tsx

import Image from "next/image";
import { HandHeart, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { DonationProject } from "../types";
import { formatIDR } from "../utils/formatters";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: DonationProject | null;
  onDonateClick: (project: DonationProject) => void;
  onWhatsAppClick: (project: DonationProject) => void;
}

export function DonationDetailDialog({ open, onOpenChange, project, onDonateClick, onWhatsAppClick }: DialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          {project.location && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-white">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{project.location}</span>
            </div>
          )}
        </div>
        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="sr-only">Detail proyek donasi</DialogDescription>
          </DialogHeader>
          <p className="text-gray-700 mt-3">{project.longDescription}</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Terkumpul</span>
              <span className="font-semibold text-emerald-700">{formatIDR(project.raised)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Target</span>
              <span className="font-semibold">{formatIDR(project.goal)}</span>
            </div>
            <Progress
              value={Math.min(100, Math.round((project.raised / project.goal) * 100))}
              className="h-2"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => onDonateClick(project)}>
              <HandHeart className="w-4 h-4 mr-2" /> Donate Sekarang
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => onWhatsAppClick(project)}>
              <MessageCircle className="w-4 h-4 mr-2" /> Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}