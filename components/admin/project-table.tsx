'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ProjectTable({ projects }: { projects: any[] }) {
  const router = useRouter();

  async function removeProject(id: string) {
    const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (response.ok) router.refresh();
  }

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200/10 text-slate-500">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Categories</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b border-slate-200/10 last:border-b-0">
                <td className="px-6 py-4">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-slate-500">/{project.slug}</div>
                </td>
                <td className="px-6 py-4">{project.categories.join(', ')}</td>
                <td className="px-6 py-4">{project.published ? 'Published' : 'Draft'} · {project.featured ? 'Featured' : 'Standard'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/projects/${project._id}/edit`} className="font-medium underline">Edit</Link>
                    <button onClick={() => removeProject(project._id)} className="font-medium text-rose-500">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
