import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ProjectCard } from '@/components/projects/project-card';
import { getProjectBySlug, getRelatedProjects } from '@/lib/projects';
import { ProjectGallery } from '@/components/projects/project-gallery';
import type { ProjectType } from '@/types/project';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = (await getProjectBySlug(slug)) as ProjectType | null;

  if (!project) return {};

  return {
    title: project.title,
    description: project.shortSummary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = (await getProjectBySlug(slug)) as ProjectType | null;

  if (!project) notFound();

  const related = await getRelatedProjects(project.categories, project.slug);

  const descriptionSections: [string, string | undefined][] = [
    ['Project overview', project.fullDescription],
    ['Problem', project.problem],
    ['Approach / process', project.approach],
    ['Implementation details', project.implementation],
    ['Results / outcomes', project.results],
    ['Lessons learned', project.lessons],
  ];

  return (
    <div>
      <SiteHeader />
      <main className="section-shell py-10">
        <Link href="/#projects" className="text-sm font-medium text-blue-600">
          ← Back to all projects
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category: string) => (
                <span
                  key={category}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-white/10"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {project.shortSummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Role:</span>{' '}
                {project.role}
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Type:</span>{' '}
                {project.projectType}
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Timeline:</span>{' '}
                {project.timeline}
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Stack:</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-4xl">
          <div className="relative aspect-16/8">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          {descriptionSections.map(([title, copy]) => (
            <div key={title} className="glass rounded-3xl p-6">
              <h2 className="text-xl font-semibold">{title}</h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {copy}
              </p>
            </div>
          ))}
        </section>

        {(project.galleryImages?.length ?? 0) > 0 && (
          <section className="mt-20">
            <h2 className="section-title py-5">Gallery</h2>
            <ProjectGallery
              photos={[
                project.featuredImage,
                ...(project.galleryImages ?? []).filter(
                  (image) => image !== project.featuredImage
                )
              ]}
            />
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title">Related projects</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item: any) => (
              <ProjectCard key={item._id} project={item} />
            ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}