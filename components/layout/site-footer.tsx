export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/10 py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Andrew Allred.</p>
        <p>Full-stack developer · UX designer · Analytical problem solver</p>
      </div>
    </footer>
  );
}
