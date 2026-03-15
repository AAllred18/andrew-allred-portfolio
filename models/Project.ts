import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortSummary: { type: String, required: true },
    fullDescription: { type: String, required: true },
    categories: [{ type: String, required: true }],
    skills: [{ type: String, required: true }],
    role: { type: String, required: true },
    projectType: { type: String, required: true },
    timeline: { type: String },
    featuredImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    outcomes: [{ type: String }],
    challenges: [{ type: String }],
    contributions: [{ type: String }],
    problem: { type: String, required: true },
    approach: { type: String, required: true },
    implementation: { type: String, required: true },
    features: [{ type: String }],
    results: { type: String, required: true },
    lessons: { type: String, required: true },
    links: [
      {
        label: String,
        url: String
      }
    ],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },

    // new
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & { _id: string };
export const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);