// src/components/sections/donation/components/DonationCard.tsx

import Image from "next/image";
import { HandHeart, MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DonationProject } from "../types";
import { formatIDR } from "../utils/formatters";

interface DonationCardProps {
    project: DonationProject;
    onCardClick: (project: DonationProject) => void;
    onDonateClick: (project: DonationProject) => void;
    onWhatsAppClick: (project: DonationProject) => void;
}

export function DonationCard({ project, onCardClick, onDonateClick, onWhatsAppClick }: DonationCardProps) {
    const percent = Math.min(100, Math.round((project.raised / project.goal) * 100));

    return (
        <Card
            className="group cursor-pointer overflow-hidden border-emerald-100 hover:border-emerald-200 transition-shadow hover:shadow-lg"
            onClick={() => onCardClick(project)}
        >
            <div className="relative w-full aspect-[16/10]">
                <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                {project.location && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-white">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{project.location}</span>
                    </div>
                )}
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">{formatIDR(project.raised)}</span>
                        <span className="text-gray-700 font-semibold">{percent}%</span>
                        <span className="text-gray-500">{formatIDR(project.goal)}</span>
                    </div>
                    <Progress value={percent} className="h-2" />
                </div>
                <div className="flex gap-2 pt-1">
                    <Button
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={(e) => { e.stopPropagation(); onDonateClick(project); }}
                    >
                        <HandHeart className="w-4 h-4 mr-2" /> Donate
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={(e) => { e.stopPropagation(); onWhatsAppClick(project); }}
                    >
                        <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                </div>
                <div className="flex items-center text-emerald-700 text-sm font-medium group-hover:underline">
                    <span>Detail</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
            </CardContent>
        </Card>
    );
}