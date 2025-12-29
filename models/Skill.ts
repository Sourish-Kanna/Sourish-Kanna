import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
    name: String, // e.g. "Frontend"
    iconName: String, // e.g. "Code2" (We will store the icon name string)
    skills: [String], // e.g. ["React", "Next.js"]
}, { timestamps: true });

const Skill = models.Skill || model("Skill", SkillSchema);
export default Skill;