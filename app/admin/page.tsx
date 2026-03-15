import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { ProjectTable } from '@/components/admin/project-table';
import { LogoutButton } from '@/components/admin/logout-button';

export default async function AdminDashboardPage() {
  const projects = await getAllProjects();

  return (
    <main className="section-shell py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Admin
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Project dashboard
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            View site
          </Link>

          <Link
            href="/admin/projects/new"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
          >
            New project
          </Link>

          <LogoutButton />
        </div>
      </div>

      <div className="mt-10">
        <ProjectTable projects={JSON.parse(JSON.stringify(projects))} />
      </div>
    </main>
  );
}