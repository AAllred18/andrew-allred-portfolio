import { ProjectForm } from '@/components/admin/project-form';

export default function NewProjectPage() {
  return (
    <main className="section-shell py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Create project</h1>
      <p className="mt-3 text-slate-500">Add a new case study, draft it, and preview before publishing.</p>
      <div className="mt-8">
        <ProjectForm mode="create" />
      </div>
    </main>
  );
}
