import {
    Code2,
    Database,
    Cpu,
    Server,
} from 'lucide-react';

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

export { PORTFOLIO_DATA };