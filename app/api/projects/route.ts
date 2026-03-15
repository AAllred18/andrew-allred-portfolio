import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { projectSchema } from '@/lib/validations';
import { Project } from '@/models/Project';

export async function GET() {
  await connectToDatabase();

  const projects = await Project.find({}).sort({ order: 1, updatedAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();

  const count = await Project.countDocuments();

  const project = await Project.create({
    ...parsed.data,
    order: count
  });

  return NextResponse.json(project, { status: 201 });
}