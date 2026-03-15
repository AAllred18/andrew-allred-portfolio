import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type ProjectCardProps = {
  project: any;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group glass overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((category: string) => (
            <span key={category} className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.shortSummary}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-slate-900 dark:group-hover:text-white" />
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {project.skills.slice(0, 4).map((skill: string) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
