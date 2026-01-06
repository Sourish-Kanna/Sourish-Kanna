import connectDB from "@/lib/db";
import { Project, Personal, Experience, Skill } from "@/models/models";
import PortfolioClient from "./PortfolioClient";

// Force dynamic rendering so the page updates when you add new data
export const dynamic = 'force-dynamic';

export default async function Page() {
  await connectDB();

  // 1. Fetch data from MongoDB
  const personalData = await Personal.findOne().lean();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  const experiences = await Experience.find().sort({ createdAt: -1 }).lean();
  const skills = await Skill.find().lean();

  // 2. Fallback Data (In case DB is empty initially to prevent crash)
  const defaultPersonal = {
    name: "Developer Name",
    title: "Full Stack Developer",
    about: "Please configure your personal info in the admin dashboard.",
    email: "email@example.com",
    github: "#",
    linkedin: "#",
    location: "Internet"
  };

  // 3. Serialize Data (Convert MongoDB Objects to strings)
  const serialize = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <PortfolioClient
      personal={serialize(personalData || defaultPersonal)}
      projects={serialize(projects)}
      experience={serialize(experiences)}
      skills={serialize(skills)}
    />
  );
}