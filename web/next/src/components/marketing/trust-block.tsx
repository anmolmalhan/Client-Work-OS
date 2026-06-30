import { testimonials, trustMetrics } from "@wdsc/domain";
import { Clock3, FileCheck2, ShieldCheck, Star } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`size-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} aria-hidden="true" />
      ))}
    </div>
  );
}

export function TrustStats() {
  const stats = [
    { icon: FileCheck2, value: `${trustMetrics.formsCompleted.toLocaleString("en-IN")}+`, label: "Forms completed" },
    { icon: Star, value: `${trustMetrics.rating}★`, label: `From ${trustMetrics.reviews}+ users` },
    { icon: Clock3, value: `~${trustMetrics.avgReplyMinutes} min`, label: "Avg WhatsApp reply" },
    { icon: ShieldCheck, value: "24 hrs", label: "Documents deleted after" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-center shadow-sm" key={stat.label}>
          <stat.icon className="mx-auto size-5 text-[var(--trust)]" aria-hidden="true" />
          <p className="mt-2 text-xl font-black text-[var(--navy)]">{stat.value}</p>
          <p className="mt-0.5 text-xs font-semibold text-[var(--muted)]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Reviews" title="What people say after we help" />
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-900">
          <Stars rating={trustMetrics.rating} />
          {trustMetrics.rating} from {trustMetrics.reviews}+ users
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure className="soft-card flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm" key={item.name}>
            <Stars rating={item.rating} />
            <blockquote className="mt-3 flex-1 text-sm leading-6 text-[var(--foreground)]">“{item.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-[var(--line)] pt-3">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[var(--trust-dark)]">
                {item.name.charAt(0)}
              </span>
              <span className="text-sm">
                <span className="block font-bold">{item.name} · {item.city}</span>
                <span className="block text-xs font-semibold text-[var(--muted)]">{item.task}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
