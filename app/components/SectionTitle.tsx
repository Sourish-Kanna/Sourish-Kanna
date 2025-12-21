
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
    <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
            {children}
        </h2>
        {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
    </div>
  );

export default SectionTitle;