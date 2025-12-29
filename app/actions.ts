"use server";

import { auth, signOut } from "@/auth";
import connectDB from "@/lib/db";
import { Project, Personal, Experience, Skill } from "@/models/models";
import { revalidatePath } from "next/cache";

// --- Helper to check auth ---
async function checkAuth() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    await connectDB();
}

// --- PROJECT ACTIONS ---
export async function saveProject(formData: FormData) {
    await checkAuth();
    const id = formData.get("id") as string; // Check for ID
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim());
    const data = {
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        description: formData.get("description"),
        link: formData.get("link"),
        type: formData.get("type"),
        image: formData.get("image"),
        tags,
    };

    if (id) {
        await Project.findByIdAndUpdate(id, data); // Update
    } else {
        await Project.create(data); // Create
    }
    revalidatePath("/");
}

export async function deleteProject(id: string) {
    await checkAuth();
    await Project.findByIdAndDelete(id);
    revalidatePath("/");
}

// --- EXPERIENCE ACTIONS ---
export async function saveExperience(formData: FormData) {
    await checkAuth();
    const id = formData.get("id") as string;
    const tech = (formData.get("tech") as string).split(",").map(t => t.trim());
    const data = {
        company: formData.get("company"),
        role: formData.get("role"),
        period: formData.get("period"),
        description: formData.get("description"),
        tech,
    };

    if (id) {
        await Experience.findByIdAndUpdate(id, data);
    } else {
        await Experience.create(data);
    }
    revalidatePath("/");
}

export async function deleteExperience(id: string) {
    await checkAuth();
    await Experience.findByIdAndDelete(id);
    revalidatePath("/");
}

// --- SKILL ACTIONS ---
export async function saveSkill(formData: FormData) {
    await checkAuth();
    const id = formData.get("id") as string;
    const skillsList = (formData.get("skills") as string).split(",").map(t => t.trim());
    const data = {
        name: formData.get("name"),
        iconName: formData.get("iconName"),
        skills: skillsList,
    };

    if (id) {
        await Skill.findByIdAndUpdate(id, data);
    } else {
        await Skill.create(data);
    }
    revalidatePath("/");
}

export async function deleteSkill(id: string) {
    await checkAuth();
    await Skill.findByIdAndDelete(id);
    revalidatePath("/");
}

// --- PERSONAL INFO ACTIONS ---
export async function updatePersonal(formData: FormData) {
    await checkAuth();
    const data = {
        name: formData.get("name"),
        title: formData.get("title"),
        email: formData.get("email"),
        github: formData.get("github"),
        linkedin: formData.get("linkedin"),
        about: formData.get("about"),
        location: formData.get("location"),
    };

    // Check if a record exists, update it. If not, create one.
    const existing = await Personal.findOne();
    if (existing) {
        await Personal.findByIdAndUpdate(existing._id, data);
    } else {
        await Personal.create(data);
    }
    revalidatePath("/");
}

export async function logout() {
    await signOut({ redirectTo: "/auth/signin" }); // Redirects to login page after logout
}