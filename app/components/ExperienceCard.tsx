
const ExperienceCard = ({ exp }: { exp: any }) => (
  <div className="relative pl-8 md:pl-0">
    <div className="md:flex items-start justify-between gap-6 group">
      {/* Timeline Line for Mobile */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-slate-700 md:hidden"></div>
      <div className="absolute left-[-4px] top-2.5 w-2 h-2 rounded-full bg-blue-500 md:hidden"></div>

      <div className="md:w-1/3 mb-2 md:mb-0 md:text-right">
        <h4 className="text-slate-100 font-semibold text-lg">{exp.company}</h4>
        <span className="text-blue-400 text-sm font-medium">{exp.period}</span>
      </div>

      {/* Timeline Line for Desktop */}
      <div className="hidden md:flex flex-col items-center mx-4">
        <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-900"></div>
        <div className="w-px h-full bg-slate-700 my-2 group-last:hidden"></div>
      </div>

      <div className="md:w-2/3 pb-8 md:pb-12">
        <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t: string, i: number) => (
            <span key={i} className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ExperienceCard;