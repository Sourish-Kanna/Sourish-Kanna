"use client";

import { useState } from "react";
import { saveProject, saveExperience, saveSkill, updatePersonal, deleteProject, deleteExperience, deleteSkill } from "@/app/admin/actions";
import styles from "./AdminClient.module.css";

export default function AdminClient({ personalData, projects, experiences, skills }: any) {
    const [activeTab, setActiveTab] = useState("personal");

    const [editProject, setEditProject] = useState<any>(null);
    const [editExperience, setEditExperience] = useState<any>(null);
    const [editSkill, setEditSkill] = useState<any>(null);

    const handleProjectSubmit = async (formData: FormData) => {
        await saveProject(formData);
        setEditProject(null);
    };

    const handleExpSubmit = async (formData: FormData) => {
        await saveExperience(formData);
        setEditExperience(null);
    };

    const handleSkillSubmit = async (formData: FormData) => {
        await saveSkill(formData);
        setEditSkill(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700">

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-slate-700 pb-4 mb-6 overflow-x-auto">
                {['personal', 'projects', 'experience', 'skills'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- PERSONAL TAB --- */}
            {activeTab === "personal" && (
                <form action={updatePersonal} className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-400">Edit Personal Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" defaultValue={personalData?.name} placeholder="Full Name" className={styles.inputField} />
                        <input name="title" defaultValue={personalData?.title} placeholder="Job Title" className={styles.inputField} />
                        <input name="email" defaultValue={personalData?.email} placeholder="Email" className={styles.inputField} />
                        <input name="location" defaultValue={personalData?.location} placeholder="Location" className={styles.inputField} />
                        <input name="github" defaultValue={personalData?.github} placeholder="GitHub URL" className={styles.inputField} />
                        <input name="linkedin" defaultValue={personalData?.linkedin} placeholder="LinkedIn URL" className={styles.inputField} />
                    </div>
                    <textarea name="about" defaultValue={personalData?.about} placeholder="About Me" rows={4} className={`${styles.inputField} w-full`} />
                    <button type="submit" className={styles.btnPrimary}>Update Personal Info</button>
                </form>
            )}

            {/* --- PROJECTS TAB --- */}
            {activeTab === "projects" && (
                <div className="space-y-8">
                    <form action={handleProjectSubmit} key={editProject?._id || "new"} className="space-y-4 border-b border-slate-700 pb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-green-400">{editProject ? "Edit Project" : "Add Project"}</h2>
                            {editProject && <button type="button" onClick={() => setEditProject(null)} className="text-xs text-slate-400 underline">Cancel Edit</button>}
                        </div>

                        <input type="hidden" name="id" value={editProject?._id || ""} />

                        <input name="title" defaultValue={editProject?.title} placeholder="Project Title" required className={`${styles.inputField} w-full`} />
                        <input name="subtitle" defaultValue={editProject?.subtitle} placeholder="Subtitle" className={`${styles.inputField} w-full`} />
                        <textarea name="description" defaultValue={editProject?.description} placeholder="Description" required className={`${styles.inputField} w-full`} />
                        <div className="grid grid-cols-2 gap-4">
                            <input name="link" defaultValue={editProject?.link} placeholder="Project Link" className={styles.inputField} />
                            <input name="type" defaultValue={editProject?.type} placeholder="Type (Mobile App, AI...)" className={styles.inputField} />
                        </div>
                        <input name="tags" defaultValue={editProject?.tags?.join(", ")} placeholder="Tags (React, Mongo...)" className={`${styles.inputField} w-full`} />
                        <button type="submit" className={styles.btnPrimary}>{editProject ? "Update Project" : "Add Project"}</button>
                    </form>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Existing Projects</h3>
                        {projects.map((p: any) => (
                            <div key={p._id} className="flex justify-between items-center bg-slate-900 p-3 rounded mb-2 group">
                                <span>{p.title}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => setEditProject(p)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                                    <button onClick={() => deleteProject(p._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- EXPERIENCE TAB --- */}
            {activeTab === "experience" && (
                <div className="space-y-8">
                    <form action={handleExpSubmit} key={editExperience?._id || "new"} className="space-y-4 border-b border-slate-700 pb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-purple-400">{editExperience ? "Edit Experience" : "Add Experience"}</h2>
                            {editExperience && <button type="button" onClick={() => setEditExperience(null)} className="text-xs text-slate-400 underline">Cancel Edit</button>}
                        </div>

                        <input type="hidden" name="id" value={editExperience?._id || ""} />

                        <div className="grid grid-cols-2 gap-4">
                            <input name="company" defaultValue={editExperience?.company} placeholder="Company" required className={styles.inputField} />
                            <input name="role" defaultValue={editExperience?.role} placeholder="Role" required className={styles.inputField} />
                        </div>
                        <input name="period" defaultValue={editExperience?.period} placeholder="Period" required className={`${styles.inputField} w-full`} />
                        <textarea name="description" defaultValue={editExperience?.description} placeholder="Description" required className={`${styles.inputField} w-full`} />
                        <input name="tech" defaultValue={editExperience?.tech?.join(", ")} placeholder="Tech Stack" className={`${styles.inputField} w-full`} />
                        <button type="submit" className={styles.btnPrimary}>{editExperience ? "Update Experience" : "Add Experience"}</button>
                    </form>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Work History</h3>
                        {experiences.map((exp: any) => (
                            <div key={exp._id} className="flex justify-between items-center bg-slate-900 p-3 rounded mb-2">
                                <div>
                                    <p className="font-bold">{exp.company}</p>
                                    <p className="text-xs text-slate-400">{exp.role}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setEditExperience(exp)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                                    <button onClick={() => deleteExperience(exp._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- SKILLS TAB --- */}
            {activeTab === "skills" && (
                <div className="space-y-8">
                    <form action={handleSkillSubmit} key={editSkill?._id || "new"} className="space-y-4 border-b border-slate-700 pb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-yellow-400">{editSkill ? "Edit Skills" : "Add Skill Category"}</h2>
                            {editSkill && <button type="button" onClick={() => setEditSkill(null)} className="text-xs text-slate-400 underline">Cancel Edit</button>}
                        </div>

                        <input type="hidden" name="id" value={editSkill?._id || ""} />

                        <div className="grid grid-cols-2 gap-4">
                            <input name="name" defaultValue={editSkill?.name} placeholder="Category (e.g. Backend)" required className={styles.inputField} />
                            <select name="iconName" defaultValue={editSkill?.iconName} className={styles.inputField}>
                                <option value="Code2">Code Icon</option>
                                <option value="Database">Database Icon</option>
                                <option value="Server">Server Icon</option>
                                <option value="Cpu">CPU/AI Icon</option>
                            </select>
                        </div>
                        <input name="skills" defaultValue={editSkill?.skills?.join(", ")} placeholder="Skills (Node.js, Python...)" required className={`${styles.inputField} w-full`} />
                        <button type="submit" className={styles.btnPrimary}>{editSkill ? "Update Category" : "Add Category"}</button>
                    </form>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Skill Categories</h3>
                        {skills.map((s: any) => (
                            <div key={s._id} className="flex justify-between items-center bg-slate-900 p-3 rounded mb-2">
                                <span>{s.name}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => setEditSkill(s)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                                    <button onClick={() => deleteSkill(s._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}