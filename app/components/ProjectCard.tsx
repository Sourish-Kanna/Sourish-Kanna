import {
    ExternalLink,
    Code2,
    Cpu,
    Smartphone
} from 'lucide-react';


const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col h-full">
        <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 p-6 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-700/[0.2] bg-[length:20px_20px]" />
            <div className="relative z-10 p-3 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-600">
                {project.type === "Mobile App" ? <Smartphone size={32} className="text-blue-400" /> :
                    project.type === "AI & Backend" ? <Cpu size={32} className="text-purple-400" /> :
                        <Code2 size={32} className="text-emerald-400" />}
            </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{project.type}</span>
                    <h3 className="text-xl font-bold text-slate-100 mt-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                </div>
                <a href={project.link} className="text-slate-400 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                </a>
            </div>
            <p className="text-sm text-slate-400 italic mb-4">{project.subtitle}</p>
            <p className="text-slate-300 mb-6 flex-1 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );

export default ProjectCard;