'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Skills', 'skills'],
  ['Experience', 'experience'],
  ['Contact', 'contact']
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.startsWith('/projects')) {
        setActiveSection('projects');
      } else {
        setActiveSection('');
      }
      return;
    }

    const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + viewportHeight >= documentHeight - 20) {
        setActiveSection('contact');
        return;
      }

      const headerOffset = 100;
      let currentSection = sectionIds[0];

      for (const element of elements) {
        const top = element.offsetTop - headerOffset;

        if (scrollPosition >= top) {
          currentSection = element.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  const handleSectionClick = (sectionId: string) => {
    if (pathname !== '/') {
      setMenuOpen(false);
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setMenuOpen(false);
  };

  const isActive = (sectionId: string) => {
    if (pathname.startsWith('/projects') && sectionId === 'projects') return true;
    if (pathname === '/') return activeSection === sectionId;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1D5491] bg-[#1D5491]/95 text-white backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-white/95">
          ANDREW ALLRED
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, sectionId]) => {
            const active = isActive(sectionId);

            return (
              <button
                key={sectionId}
                type="button"
                onClick={() => handleSectionClick(sectionId)}
                className="relative py-1 text-sm text-slate-100 transition hover:text-white"
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}

          <Link
            href="/Andrew_Allred_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
          >
            Resume
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <div className="relative h-5 w-6">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-2 h-0.5 w-full rounded-full bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute left-0 top-4 h-0.5 w-full rounded-full bg-white"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 top-full w-full border-t border-white/10 bg-[#1D5491]/98 shadow-xl backdrop-blur md:hidden dark:bg-slate-950/98"
          >
            <nav className="section-shell flex flex-col py-4">
              {links.map(([label, sectionId]) => {
                const active = isActive(sectionId);

                return (
                  <button
                    key={sectionId}
                    type="button"
                    onClick={() => handleSectionClick(sectionId)}
                    className={`rounded-lg px-3 py-3 text-left text-sm transition ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-slate-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              <Link
                href="/Andrew_Allred_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
              >
                Resume
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}