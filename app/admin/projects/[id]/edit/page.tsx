import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/project-form';
import { getProjectById } from '@/lib/projects';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <main className="section-shell py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Edit project</h1>
      <div className="mt-8">
        <ProjectForm mode="edit" initialValues={JSON.parse(JSON.stringify(project))} />
      </div>
    </main>
  );
}
