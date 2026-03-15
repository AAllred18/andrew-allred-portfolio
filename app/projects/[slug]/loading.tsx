export default function LoadingProject() {
  return (
    <div className="section-shell py-24 flex flex-col items-center gap-4 text-slate-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
      <p className="text-sm tracking-wide">Loading project...</p>
    </div>
  );
}