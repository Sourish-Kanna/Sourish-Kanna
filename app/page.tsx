"use client";

import { useState, useEffect } from 'react';

// --- ICON IMPORTS ---
import {
  Mail,
  ExternalLink,
  Terminal,
  Menu,
  X,
  ChevronRight,
  Download,
} from 'lucide-react';
import { SiGithub, SiLinkedin } from "react-icons/si";

// --- COMPONENT IMPORTS ---
import { SectionTitle, ProjectCard, SkillCard, ExperienceCard } from './components/components';

// --- DATA IMPORT ---
import { PORTFOLIO_DATA } from './data';
// import connectDB from "@/lib/db";
// import { Project, Personal, Experience, Skill } from "@/models/models";

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
              href="https://github.com/Sourish-Kanna"
              target="_blank"
              rel="noreferrer"
              className="ml-4 px-4 py-2 text-sm font-medium text-slate-900 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <SiGithub size={16} />
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
                <a href={PORTFOLIO_DATA.personal.github} className="hover:text-blue-400 transition-colors"><SiGithub size={24} /></a>
                <a href={PORTFOLIO_DATA.personal.linkedin} className="hover:text-blue-400 transition-colors"><SiLinkedin size={24} /></a>
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
                  <div className="ml-auto text-xs text-slate-500 font-mono">About-Me.js</div>
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
                    <span className="text-purple-400">["MERN", "Next.js", "Python", "Flutter"]</span>,
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
            <a href="https://github.com/Sourish-Kanna" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
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
          <a href="#" className="hover:text-blue-400 transition-colors"><SiGithub size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><SiLinkedin size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><Mail size={20} /></a>
        </div>
        <p>© {new Date().getFullYear()} Sourish Kanna. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}