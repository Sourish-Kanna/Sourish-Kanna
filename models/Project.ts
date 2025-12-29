import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String }, // External link (GitHub/Live Demo)
        tags: { type: [String], default: [] }, // e.g. ["Next.js", "MongoDB"]
        image: { type: String }, // URL to image
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Prevent overwriting the model if it already compiles
const Project = models.Project || model("Project", ProjectSchema);

export default Project;