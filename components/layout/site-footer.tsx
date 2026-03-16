import { Github, Linkedin, Mail } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/10 py-8">
      <div className="section-shell flex flex-col gap-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

        {/* Left */}
        <div>
          <p>© {new Date().getFullYear()} Andrew Allred.</p>
          <p>Full-stack developer · UX designer · Analytical problem solver</p>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-5 text-slate-400">
          <a
            href="https://github.com/AAllred18"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="mailto:your@email.com"
            className="transition hover:text-white"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}