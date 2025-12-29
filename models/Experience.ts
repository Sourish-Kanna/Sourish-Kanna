import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
    company: String,
    role: String,
    period: String,
    description: String,
    tech: [String], // Array of strings
}, { timestamps: true });

const Experience = models.Experience || model("Experience", ExperienceSchema);
export default Experience;