// /components/recruitment/RecruitmentHeader.tsx

export function RecruitmentHeader() {
    return (
      <div className="text-center mb-20">
        <div className="inline-block mb-4">
              <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-5 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
                Open Recruitment
              </span>
            </div>
        <h3 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
        Join Our <span className="text-emerald-600"> Mission</span>
        </h3>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-balance leading-relaxed">
        We’re looking for passionate people ready to drive real environmental impact. If you’ve got the passion and skills, join us!
        </p>
      </div>
    )
  }