import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import { Project, Personal, Experience, Skill } from "@/models/models";
import AdminClient from "./AdminClient";
import { logout } from "@/app/admin/actions"; // <--- Import the action

export default async function AdminPage() {
    const session = await auth();
    if (!session) redirect("/auth/signin");

    await connectDB();

    // Fetch all data to populate the dashboard
    // lean() converts Mongoose objects to plain JS objects
    const personalData = await Personal.findOne().lean();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    const experiences = await Experience.find().sort({ createdAt: -1 }).lean();
    const skills = await Skill.find().lean();

    // Helper to serialize Mongo IDs (convert Object_id to string)
    const serialize = (data: any) => JSON.parse(JSON.stringify(data));

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            {/* Header Section with Logout */}
            <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold">Portfolio CMS</h1>

                {/* Logout Form */}
                <form action={logout}>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                    >
                        Sign Out
                    </button>
                </form>
            </div>

            <AdminClient
                personalData={serialize(personalData || {})}
                projects={serialize(projects)}
                experiences={serialize(experiences)}
                skills={serialize(skills)}
            />
        </div>
    );
}