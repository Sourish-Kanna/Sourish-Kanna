"use client";

import { useState, useEffect } from 'react';
import {
    Mail,
    ExternalLink,
    Terminal,
    Menu,
    X,
    ChevronRight,
    Download,
    Code2,
    Database,
    Cpu,
    Server,
} from 'lucide-react';
import { SiGithub, SiLinkedin } from "react-icons/si";
import { SectionTitle, ProjectCard, SkillCard, ExperienceCard } from './components';

// Helper to map icon names string to actual Icon components
const iconMap: any = {
    Code2: <Code2 size={20} />,
    Database: <Database size={20} />,
    Cpu: <Cpu size={20} />,
    Server: <Server size={20} />,
};

export default function PortfolioClient({ personal, skills, experience, projects }: any) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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

    // Fallback if DB is empty
    if (!personal) return <div className="text-white text-center p-20">Loading Portfolio... (Please add data in Admin)</div>;

    // Add this function inside your component
    async function handleSubmit(e: any) {
        e.preventDefault();
        setFormStatus("submitting");

        const formData = new FormData(e.target);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string || "");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus("success");
                e.target.reset();
            } else {
                setFormStatus("error");
            }
        } catch (err) {
            setFormStatus("error");
        }

        // Reset status after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000);
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">

            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
                        <Terminal className="text-blue-500" />
                        <span>{personal.name.split(' ')[0]}<span className="text-blue-500">.dev</span></span>
                    </a>

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
                            href={personal.github}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-4 px-4 py-2 text-sm font-medium text-slate-900 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <SiGithub size={16} />
                            GitHub
                        </a>
                    </div>

                    <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

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
            <section id="home" className="pt-28 pb-20 md:pt-28 md:pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                                Available for opportunities
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Building <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Intelligent</span> <br />
                                Web Solutions.
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                I'm {personal.name}, a {personal.title}. {personal.about.split('.')[0]}
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
                                <a href={personal.github} className="hover:text-blue-400 transition-colors"><SiGithub size={24} /></a>
                                <a href={personal.linkedin} className="hover:text-blue-400 transition-colors"><SiLinkedin size={24} /></a>
                                <a href={`mailto:${personal.email}`} className="hover:text-blue-400 transition-colors"><Mail size={24} /></a>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-[500px] relative hidden md:block group">
                            <div className="absolute -inset-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
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
                                        <span className="text-green-400">"{personal.name}"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-slate-400 mr-2">location:</span>
                                        <span className="text-purple-400">"{personal.location}"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-slate-400 mr-2">status:</span>
                                        <span className="text-green-400">"Hiring!"</span>
                                    </div>
                                    <div>
                                        <span className="text-yellow-300">{"}"}</span>;
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
                                Hi, I'm <span className="text-white font-semibold">{personal.name.split(' ')[0]}</span>. {personal.about}
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                                    <h4 className="text-2xl font-bold text-white mb-1">3+</h4>
                                    <p className="text-slate-400 text-sm">Years Coding</p>
                                </div>
                                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                                    <h4 className="text-2xl font-bold text-white mb-1">{projects.length}+</h4>
                                    <p className="text-slate-400 text-sm">Projects Built</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skill: any, idx: number) => (
                                <SkillCard key={idx} category={{ ...skill, icon: iconMap[skill.iconName] }} />
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
                        {experience.map((exp: any, idx: number) => (
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
                        {projects.map((project: any, idx: number) => (
                            <ProjectCard key={idx} project={project} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href={personal.github} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            View more on GitHub <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* --- CONTACT --- */}
            <section id="contact" className="py-20 px-6 bg-linear-to-t from-slate-900 to-slate-800/30">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Let's work together</h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
                        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                            {/* Honeypot Spam Protection (Hidden) */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="Hello, I'd like to talk about..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === "submitting" || formStatus === "success"}
                                className={`w-full py-4 font-bold rounded-lg transition-all transform active:scale-95 ${formStatus === "success"
                                        ? "bg-green-600 hover:bg-green-500 text-white"
                                        : "bg-blue-600 hover:bg-blue-500 text-white"
                                    }`}
                            >
                                {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Message Sent!" : "Send Message"}
                            </button>

                            {formStatus === "error" && (
                                <p className="text-red-400 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                <div className="flex justify-center gap-6 mb-4">
                    <a href={personal.github} className="hover:text-blue-400 transition-colors"><SiGithub size={20} /></a>
                    <a href={personal.linkedin} className="hover:text-blue-400 transition-colors"><SiLinkedin size={20} /></a>
                    <a href={`mailto:${personal.email}`} className="hover:text-blue-400 transition-colors"><Mail size={20} /></a>
                </div>
                <p>© {new Date().getFullYear()} {personal.name}. Built with React & Tailwind.</p>
            </footer>
        </div>
    );
}