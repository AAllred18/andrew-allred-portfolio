import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { ContactForm } from '@/components/forms/contact-form';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { FilterableProjectGrid } from '@/components/projects/filterable-project-grid';
import { ProjectCard } from '@/components/projects/project-card';
import { getFeaturedProjects, getPublishedProjects } from '@/lib/projects';
import { AboutGallery } from '@/components/about/about-gallery';
import { HeroArtTilt } from '@/components/HeroArtTilt';

const skills = {
  Development: [
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'HTML/CSS',
    'REST APIs',
    'C++',
    'C#'
  ],
  'UX Design': [
    'Figma',
    'Wireframing',
    'Prototyping',
    'Design Systems',
    'Accessibility (WCAG)',
    'Product Thinking'
  ],
  Analysis: [
    'SQL',
    'PostgreSQL',
    'MySQL',
    'R',
    'Tableau',
    'Power BI',
    'Advanced Excel'
  ],
  'Cloud & Tools': [
    'AWS (EC2, S3)',
    'Azure',
    'MongoDB',
    'Git / GitHub',
    'Linux',
    'Agile Boards',
    'Microsoft Planner',
    'Lucidchart',
    'Trello'
  ]
};

const experience = [
  {
    title: 'Information Systems Student',
    company: 'BYU Marriott School',
    dates: 'September 2024 - Present',
    summary:
      'Develop experience across full-stack development, UX design, data analysis, cybersecurity, and project management through academic product work, case studies, and real-world team projects.'
  },
  {
    title: 'Communications & Marketing Team Lead',
    company: 'BYU Sorensen Center',
    dates: 'May 2024 - Present',
    summary:
      'Lead web and digital projects across content, accessibility, and front-end experiences while coordinating execution with cross-functional teammates.'
  },
  {
    title: 'Data Journalist',
    company: 'Sport Radar',
    dates: 'February 2024 - Present',
    summary:
      'Tracked live game statistics with 100% accuracy while maintaining awareness of rule changes and performance trends relevant to scouting and analytics.'
  },
  {
    title: 'Customer Support Representative',
    company: 'Crumbl',
    dates: 'September 2022 - May 2024',
    summary:
      'Handled customer support and shipping claims while improving tracking workflows in Excel, helping recover over $29,000 in FedEx claims and increasing team productivity.'
  }
];

export default async function HomePage() {
  const [featuredProjects, allProjects] = await Promise.all([getFeaturedProjects(), getPublishedProjects()]);

  return (
    <div>
      <SiteHeader />
      <main>
        <section className="section-shell grid items-center gap-8 py-6 sm:py-8 lg:min-h-[calc(100vh-4rem)] lg:py-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-sm mt-6 font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Full-Stack Developer · UX Designer · Analyst
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Andrew "AJ" Allred
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              BYU Information Systems student creating thoughtful products across development, UX, accessibility, and data-informed problem solving.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
                View projects
              </a>
              <a href="#contact" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium dark:border-slate-700">
                Contact me
              </a>
            </div>
            <div className="mt-8 flex gap-5 text-slate-500">
              <a href="https://github.com/AAllred18" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/allredandrew/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:andrewallred509@gmail.com" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="w-[85%] max-w-90 sm:max-w-105 lg:max-w-none">
              <HeroArtTilt />
            </div>
          </div>

          {/* <div className="glass rounded-[2rem] p-6 shadow-xl">
            <div className="overflow-hidden rounded-[1.2rem] border border-white/5 bg-slate-50">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/personal/AJ-Headshot.png"
                  alt="Andrew Allred"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div> */}
        </section>

        <section id="about" className="section-shell py-15 scroll-mt-5">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="section-title">About Me</h2>
              <p className="section-copy">
                Growing up in Kealakekua shaped my curiosity and love for creating things that serve others. 
                Today I study Information Systems and enjoy working across development, UX, and data to build products that are simple, useful, and thoughtfully designed. 
                Outside of school and projects, I’m happily married to my wife Reagan, and we’re excited to be growing our family this summer.
              </p>
            </div>

            <AboutGallery />
          </div>
        </section>

        <section className="section-shell py-15 scroll-mt-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="section-title">Featured work</h2>
              <p className="section-copy">A quick look at selected projects that combine execution quality with thoughtful problem solving.</p>
            </div>
            <Link href="#projects" className="hidden text-sm font-medium text-blue-600 sm:inline-flex">
              Browse all work
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell py-15 scroll-mt-5">
          <h2 className="section-title">Projects</h2>
          <p className="section-copy">Filter work by development, analysis, or UX design. Recruiters can quickly see range without losing cohesion.</p>
          <div className="mt-10">
            <FilterableProjectGrid projects={JSON.parse(JSON.stringify(allProjects))} />
          </div>
        </section>

        <section id="skills" className="section-shell py-15 scroll-mt-5">
          <h2 className="section-title">Skills</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {Object.entries(skills).map(([group, values]) => (
              <div key={group} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-semibold">{group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {values.map((value) => (
                    <span key={value} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition hover:bg-blue-100 hover:text-blue-700">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section-shell py-15 scroll-mt-5">
          <h2 className="section-title">Experience</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {experience.map((item) => (
              <article key={item.title} className="glass rounded-3xl p-6">
                <p className="text-sm text-blue-600 dark:text-blue-300">{item.company}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm text-blue-900 dark:text-blue-900">{item.dates}</p>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell py-15">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="section-title">Let’s connect.</h2>
              <p className="section-copy">
                I’m always open to conversations about full-time roles, internships, or interesting projects. Feel free to reach out if you'd like to connect or learn more about my work.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
