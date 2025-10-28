// src/components/sections/donation/components/DonationHeader.tsx

import { Progress } from "@/components/ui/progress";
import { formatIDR } from "../utils/formatters";

interface DonationHeaderProps {
    totalRaised: number;
    totalGoal: number;
    overallPercent: number;
}

export function DonationHeader({ totalRaised, totalGoal, overallPercent }: DonationHeaderProps) {
    return (
        <div className="text-center max-w-3xl mx-auto mb-12">
           <div className="inline-block mb-4">
              <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-5 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
                Our Team
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                Dukung Proyek <span className="text-emerald-600">Kebaikan</span> Kami
            </h2>
            <p className="text-gray-600 mt-4">
                Setiap kontribusi kamu membantu mewujudkan ruang hijau, edukasi, dan akses pangan sehat untuk komunitas.
            </p>

            <div className="mt-8 bg-white/70 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-left">
                        <div className="text-sm text-gray-500">Terkumpul</div>
                        <div className="text-2xl font-bold text-emerald-700">{formatIDR(totalRaised)}</div>
                    </div>
                    <div className="flex-1">
                        <Progress value={overallPercent} className="h-3" />
                    </div>
                    <div className="text-left md:text-right">
                        <div className="text-sm text-gray-500">Target</div>
                        <div className="text-2xl font-bold text-gray-900">{formatIDR(totalGoal)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}