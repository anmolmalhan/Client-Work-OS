import { Sparkles } from "lucide-react";

// Rounded gradient banner for the (gated) admin screens — same visual language
// as the public PageHero, but sized to sit inside the dashboard layout.
export function AdminHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-fade gradient-hero relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_20px_44px_rgba(29,63,176,0.3)] sm:p-8">
      <Sparkles className="pointer-events-none absolute right-6 top-6 size-20 text-white/10" aria-hidden="true" />
      <p className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
        {eyebrow}
      </p>
      <h1 className="relative mt-3 text-2xl font-black leading-tight sm:text-3xl">{title}</h1>
      <p className="relative mt-2 max-w-3xl text-sm leading-6 text-blue-100/90">{description}</p>
    </div>
  );
}
