"use client";

import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Cpu,
  Menu,
  X,
  ChevronRight,
  Download,
  Server,
  Smartphone
} from 'lucide-react';

// --- DATA FROM RESUME ---
const PORTFOLIO_DATA = {
  personal: {
    name: "Sourish Kanna",
    title: "Full-Stack Developer | AI & LLM Enthusiast",
    email: "sourishkanna001@gmail.com",
    github: "[https://github.com/Sourish-Kanna](https://github.com/Sourish-Kanna)",
    linkedin: "[https://www.linkedin.com/in/sourish-kanna-97330a2a2/](https://www.linkedin.com/in/sourish-kanna-97330a2a2/)",
    about: "I am a Full-Stack Developer specializing in Python (FastAPI, Flask), Flutter, and the MERN stack. I have a proven track record of building complex, AI-driven systems, including multi-agent LLM platforms and NLP models. My passion lies in translating business requirements into robust, scalable solutions.",
    location: "Mumbai, India"
  },
  skills: [
    { name: "Frontend", icon: <Code2 size={20} />, skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "HTML5/CSS3"] },
    { name: "Backend", icon: <Server size={20} />, skills: ["Node.js", "FastAPI", "Flask", "Python", "Express"] },
    { name: "Database", icon: <Database size={20} />, skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase"] },
    { name: "AI & Tools", icon: <Cpu size={20} />, skills: ["LLMs (Gemini, Llama 3)", "LangChain", "Docker", "Git", "GitHub Actions"] }
  ],
  experience: [
    {
      company: "CHANGE Networks",
      role: "App Developer Intern",
      period: "Feb 2025 - Sep 2025",
      description: "Developed a Flutter-based mobile application to translate web services into a responsive mobile experience. Collaborated in an agile team to build pixel-perfect visuals and identified critical backend flaws using Postman.",
      tech: ["Flutter", "Dart", "REST APIs", "Postman"]
    },
    {
      company: "CSRBOX",
      role: "AI Intern",
      period: "Jun 2024 - Jul 2024",
      description: "Developed a prototype AI model using IBM Watson Studio to detect anemia from blood test reports, achieving 88% accuracy on the test dataset.",
      tech: ["IBM Watson", "Python", "Data Analytics"]
    },
    {
      company: "Finlatics",
      role: "Data Analyst Intern",
      period: "Mar 2024 - May 2024",
      description: "Analyzed a 45k+ row banking dataset to identify factors influencing term deposit subscriptions. Delivered core insights through visualization that call duration was the strongest predictor.",
      tech: ["Python", "Pandas", "Matplotlib", "Data Visualization"]
    }
  ],
  projects: [
    {
      title: "SmartAudit LLM",
      subtitle: "AI Multi-Agent Invoice Auditing",
      description: "Architected a multi-agent system where agents analyze invoices from auditor, manager, and lawyer perspectives. Engineered a hybrid processing pipeline reducing manual auditing time.",
      tags: ["Python", "FastAPI", "Llama 3", "Groq API"],
      link: "#",
      type: "AI & Backend"
    },
    {
      title: "Next Bus",
      subtitle: "Arrival Prediction App with CI/CD",
      description: "A scalable bus arrival prediction app using Flutter and FastAPI. Implemented a full CI/CD pipeline using GitHub Actions to automate web and Android APK releases.",
      tags: ["Flutter", "FastAPI", "Firebase", "CI/CD"],
      link: "#",
      type: "Mobile App"
    },
    {
      title: "AI Cyber Laws Assistant",
      subtitle: "Legal-Tech Q&A Platform",
      description: "Developed a platform demystifying Indian cyber laws using Google Gemini API. Built secure authentication and a community tab for user interaction.",
      tags: ["React", "Supabase", "Gemini API", "PostgreSQL"],
      link: "#",
      type: "Full Stack"
    },
    {
      title: "Aathichudi Pronunciation",
      subtitle: "NLP-Powered Tool",
      description: "Full-stack NLP project analyzing Tamil pronunciation accuracy using Levenshtein distance algorithm with real-time feedback.",
      tags: ["React", "FastAPI", "NLP", "Cloudinary"],
      link: "#",
      type: "AI & Web"
    }
  ]
};

// --- COMPONENTS ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 flex items-center gap-3">
      <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
      {children}
    </h2>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
  </div>
);

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

// --- MAIN APP COMPONENT ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
            <Terminal className="text-blue-500" />
            <span>Sourish<span className="text-blue-500">.dev</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href.substring(1))}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${activeSection === link.href.substring(1) ? 'text-blue-500' : 'text-slate-400'}`}
              >
                {link.name}
              </button>
            ))}
            <a
              href="[https://github.com/Sourish-Kanna](https://github.com/Sourish-Kanna)"
              target="_blank"
              rel="noreferrer"
              className="ml-4 px-4 py-2 text-sm font-medium text-slate-900 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-800 border-b border-slate-700 shadow-xl">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href.substring(1))}
                  className="text-left text-slate-300 hover:text-blue-400 py-2"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                Available for opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Intelligent</span> <br />
                Web Solutions.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                I'm {PORTFOLIO_DATA.personal.name}, a {PORTFOLIO_DATA.personal.title}.
                I engineer scalable full-stack applications and multi-agent AI systems using modern stacks like MERN, FastAPI, and Flutter.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollTo('projects')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  View Work
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Resume
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center md:justify-start gap-6 text-slate-500">
                <a href={PORTFOLIO_DATA.personal.github} className="hover:text-blue-400 transition-colors"><Github size={24} /></a>
                <a href={PORTFOLIO_DATA.personal.linkedin} className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-blue-400 transition-colors"><Mail size={24} /></a>
              </div>
            </div>

            {/* Abstract Tech Graphic */}
            <div className="flex-1 w-full max-w-[500px] relative hidden md:block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-xs text-slate-500 font-mono">portfolio-backend.js</div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex">
                    <span className="text-pink-500 mr-2">const</span>
                    <span className="text-blue-400 mr-2">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-300 ml-2">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400 mr-2">name:</span>
                    <span className="text-green-400">"Sourish Kanna"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400 mr-2">stack:</span>
                    <span className="text-purple-400">["MERN", "Next.js", "Python"]</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400 mr-2">focus:</span>
                    <span className="text-green-400">"AI-Driven Systems"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400 mr-2">status:</span>
                    <span className="text-green-400">"Hiring!"</span>
                  </div>
                  <div>
                    <span className="text-yellow-300">{"}"}</span>;
                  </div>
                  <div className="pt-2">
                    <span className="text-blue-400">developer</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-300">buildFuture</span>
                    <span className="text-white">()</span>;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS & ABOUT --- */}
      <section id="about" className="py-20 bg-slate-900/50 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="A brief overview of my technical arsenal and background.">About Me & Skills</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                Hi, I'm <span className="text-white font-semibold">Sourish</span>. {PORTFOLIO_DATA.personal.about}
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Currently, I am exploring <span className="text-blue-400">Advanced LLM Orchestration</span> and <span className="text-blue-400">DevOps</span> best practices to build production-ready applications.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="text-2xl font-bold text-white mb-1">3+</h4>
                  <p className="text-slate-400 text-sm">Years Coding</p>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="text-2xl font-bold text-white mb-1">10+</h4>
                  <p className="text-slate-400 text-sm">Projects Built</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.skills.map((skill, idx) => (
                <SkillCard key={idx} category={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="My professional journey and internships.">Work Experience</SectionTitle>
          <div className="mt-12 space-y-2">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Featured applications, from AI Agents to Mobile Apps.">Featured Projects</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="[https://github.com/Sourish-Kanna](https://github.com/Sourish-Kanna)" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              View more on GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-t from-slate-900 to-slate-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's work together</h2>
          <p className="text-slate-400 mb-10 text-lg">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Hello, I'd like to talk about..." />
              </div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><Mail size={20} /></a>
        </div>
        <p>© {new Date().getFullYear()} Sourish Kanna. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}