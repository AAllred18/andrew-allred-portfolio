import { z } from 'zod';
import { PROJECT_CATEGORIES } from './constants';

export const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url()
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  shortSummary: z.string().min(12),
  fullDescription: z.string().min(40),
  categories: z.array(z.enum(PROJECT_CATEGORIES)).min(1),
  skills: z.array(z.string().min(1)).min(1),
  role: z.string().min(2),
  projectType: z.string().min(2),
  timeline: z.string().optional().default(''),
  featuredImage: z.string().refine(
  (val) => val.startsWith('/') || val.startsWith('http'),
  { message: 'Must be a local path or valid URL' }
  ),
  galleryImages: z.array(
  z.string().refine(
    (val) => val.startsWith('/') || val.startsWith('http'),
    { message: 'Each gallery image must be a local path or valid URL' }
  )
  ).default([]),
  outcomes: z.array(z.string().min(1)).default([]),
  challenges: z.array(z.string().min(1)).default([]),
  contributions: z.array(z.string().min(1)).default([]),
  problem: z.string().min(10),
  approach: z.string().min(10),
  implementation: z.string().min(10),
  features: z.array(z.string().min(1)).default([]),
  results: z.string().min(10),
  lessons: z.string().min(10),
  links: z.array(linkSchema).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export type ProjectInput = z.infer<typeof projectSchema>;
