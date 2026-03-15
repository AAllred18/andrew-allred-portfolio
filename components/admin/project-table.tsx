'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ProjectTable({ projects: initialProjects }: { projects: any[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(
    [...initialProjects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  async function removeProject(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setProjects((current) => current.filter((project) => project._id !== id));
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function moveProject(id: string, direction: 'up' | 'down') {
    const currentIndex = projects.findIndex((project) => project._id === id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const nextProjects = [...projects];
    const [moved] = nextProjects.splice(currentIndex, 1);
    nextProjects.splice(targetIndex, 0, moved);

    const reordered = nextProjects.map((project, index) => ({
      ...project,
      order: index
    }));

    const previousProjects = projects;
    setProjects(reordered);
    setMovingId(id);

    try {
      const response = await fetch('/api/projects/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projects: reordered.map((project) => ({
            id: project._id,
            order: project.order
          }))
        })
      });

      if (!response.ok) {
        setProjects(previousProjects);
      } else {
        router.refresh();
      }
    } catch {
      setProjects(previousProjects);
    } finally {
      setMovingId(null);
    }
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
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project._id}
                className="border-b border-slate-200/10 transition hover:bg-slate-50/50 last:border-b-0 dark:hover:bg-slate-900/20"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                      {project.featuredImage ? (
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {project.title}
                      </div>
                      <div className="text-slate-500">/{project.slug}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category: string) => (
                      <span
                        key={category}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.published
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
                      }`}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.featured
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {project.featured ? 'Featured' : 'Standard'}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={index === 0 || movingId === project._id}
                      onClick={() => moveProject(project._id, 'up')}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1 || movingId === project._id}
                      onClick={() => moveProject(project._id, 'down')}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      ↓
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => removeProject(project._id)}
                      disabled={deletingId === project._id}
                      className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-500 transition hover:bg-rose-50 disabled:opacity-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
                    >
                      {deletingId === project._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}