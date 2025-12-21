const SkillCard = ({ category }: { category: any }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 group">
        <div className="flex items-center gap-3 mb-4 text-blue-400 group-hover:text-blue-300">
            <div className="p-2 bg-blue-500/10 rounded-lg">
                {category.icon}
            </div>
            <h3 className="font-semibold text-lg text-slate-100">{category.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {category.skills.map((skill: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-slate-900/50 text-slate-300 text-sm rounded-full border border-slate-700/50">
                    {skill}
                </span>
            ))}
        </div>
    </div>
  );

export default SkillCard;