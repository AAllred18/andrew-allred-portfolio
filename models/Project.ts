import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    shortSummary: { type: String },
    fullDescription: { type: String },

    categories: [{ type: String }],
    skills: [{ type: String }],

    role: { type: String },
    projectType: { type: String },
    timeline: { type: String },
    featuredImage: { type: String },

    galleryImages: [{ type: String }],
    outcomes: [{ type: String }],
    challenges: [{ type: String }],
    contributions: [{ type: String }],

    problem: { type: String },
    approach: { type: String },
    implementation: { type: String },
    features: [{ type: String }],
    results: { type: String },
    lessons: { type: String },

    links: [
      {
        label: String,
        url: String
      }
    ],

    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['draft', 'in-progress', 'review', 'published'],
      default: 'draft'
    },

    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & { _id: string };
export const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);