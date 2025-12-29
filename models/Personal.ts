import mongoose, { Schema, model, models } from "mongoose";

const PersonalSchema = new Schema({
    name: String,
    title: String,
    email: String,
    github: String,
    linkedin: String,
    about: String,
    location: String,
}, { timestamps: true });

const Personal = models.Personal || model("Personal", PersonalSchema);
export default Personal;