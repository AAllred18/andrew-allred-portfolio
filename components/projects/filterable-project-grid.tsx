'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PROJECT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ProjectCard } from './project-card';

export function FilterableProjectGrid({ projects }: { projects: any[] }) {
  const [selected, setSelected] = useState<string[]>([...PROJECT_CATEGORIES]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'Newest' | 'Featured'>('Featured');

  const filtered = useMemo(() => {
    const results = projects.filter((project) => {
      const matchesCategory = project.categories.some((category: string) => selected.includes(category));
      const haystack = `${project.title} ${project.shortSummary} ${project.skills.join(' ')}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    return results.sort((a, b) => {
      if (sort === 'Featured') return Number(b.featured) - Number(a.featured);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [projects, query, selected, sort]);

  const toggle = (value: string) => {
    setSelected((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {PROJECT_CATEGORIES.map((category) => {
              const active = selected.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggle(category)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300'
                  )}
                >
                  {category}
                </button>
              );
            })}
            <button onClick={() => setSelected([...PROJECT_CATEGORIES])} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium dark:border-slate-700">
              Clear filters
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search projects"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as 'Newest' | 'Featured')}
              className="glass rounded-full px-4 py-2 text-sm outline-none"
            >
              <option>Featured</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-slate-500">
          No projects match your current filters. Try resetting or broadening the search.
        </div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
