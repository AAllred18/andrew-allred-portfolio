import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Project } from '@/models/Project';

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const body = await request.json();
    const updates = body.projects as { id: string; order: number }[];

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await Promise.all(
      updates.map((item) =>
        Project.findByIdAndUpdate(item.id, { order: item.order })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder projects' },
      { status: 500 }
    );
  }
}