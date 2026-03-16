import { z } from 'zod';
import { PROJECT_CATEGORIES } from './constants';

export const linkSchema = z.object({
  label: z.string().trim().optional().or(z.literal('')),
  url: z.string().trim().optional().or(z.literal(''))
});

const imagePathSchema = z
  .string()
  .trim()
  .refine((val) => val === '' || val.startsWith('/') || val.startsWith('http'), {
    message: 'Must be a local path or valid URL'
  });

export const projectSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters'),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),

  shortSummary: z.string().trim().optional().or(z.literal('')),
  fullDescription: z.string().trim().optional().or(z.literal('')),

  categories: z.array(z.enum(PROJECT_CATEGORIES)).default([]),
  skills: z.array(z.string().trim().min(1)).default([]),

  role: z.string().trim().optional().or(z.literal('')),
  projectType: z.string().trim().optional().or(z.literal('')),
  timeline: z.string().trim().optional().default(''),

  featuredImage: imagePathSchema.optional().default(''),
  galleryImages: z.array(imagePathSchema).default([]),

  outcomes: z.array(z.string().trim().min(1)).default([]),
  challenges: z.array(z.string().trim().min(1)).default([]),
  contributions: z.array(z.string().trim().min(1)).default([]),

  problem: z.string().trim().optional().or(z.literal('')),
  approach: z.string().trim().optional().or(z.literal('')),
  implementation: z.string().trim().optional().or(z.literal('')),

  features: z.array(z.string().trim().min(1)).default([]),

  results: z.string().trim().optional().or(z.literal('')),
  lessons: z.string().trim().optional().or(z.literal('')),

  links: z.array(linkSchema).default([]),

  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  status: z.enum(['draft', 'in-progress', 'review', 'published']).default('draft')
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export type ProjectInput = z.infer<typeof projectSchema>;