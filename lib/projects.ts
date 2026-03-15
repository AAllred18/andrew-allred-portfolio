import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { connectToDatabase } from './db';
import { Project } from '@/models/Project';

export async function getPublishedProjects() {
  noStore();
  await connectToDatabase();
  return Project.find({ published: true }).sort({ featured: -1, createdAt: -1 }).lean();
}

export async function getAllProjects() {
  noStore();
  await connectToDatabase();
  return Project.find({}).sort({ createdAt: -1 }).lean();
}

export async function getFeaturedProjects() {
  noStore();
  await connectToDatabase();
  return Project.find({ published: true, featured: true }).sort({ createdAt: -1 }).limit(3).lean();
}

export async function getProjectBySlug(slug: string) {
  noStore();
  await connectToDatabase();
  return Project.findOne({ slug, published: true }).lean();
}

export async function getProjectById(id: string) {
  noStore();
  await connectToDatabase();
  return Project.findById(id).lean();
}

export async function getRelatedProjects(categories: string[], slug: string) {
  noStore();
  await connectToDatabase();
  return Project.find({
    published: true,
    slug: { $ne: slug },
    categories: { $in: categories }
  })
    .limit(3)
    .sort({ featured: -1, createdAt: -1 })
    .lean();
}
