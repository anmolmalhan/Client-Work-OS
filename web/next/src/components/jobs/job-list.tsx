import { jobCategoryDescriptions, jobCategoryLabels, type JobCategory, type JobPost } from "@wdsc/domain";
import { ArrowRight, Award, BookOpenText, Briefcase, KeyRound, type LucideIcon, Ticket } from "lucide-react";
import Link from "next/link";
import { daysUntil } from "@/lib/format";

// A listing is flagged "New" for its first 7 days.
function isNew(job: JobPost) {
  return daysUntil(job.publishedAt) >= -7;
}

const categoryIcon: Record<JobCategory, LucideIcon> = {
  latest_job: Briefcase,
  result: Award,
  admit_card: Ticket,
  answer_key: KeyRound,
  syllabus: BookOpenText,
};

export function JobList({ category, jobs, index = 0 }: { category: JobCategory; jobs: JobPost[]; index?: number }) {
  const Icon = categoryIcon[category];

  return (
    <section
      className="glow-card stagger-card flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <header className={`shine flex items-center gap-3 px-4 py-3.5 text-white cat-${category}`}>
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-white/20">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-bold leading-tight">{jobCategoryLabels[category]}</h2>
          <p className="text-[11px] font-medium leading-tight text-white/80">{jobCategoryDescriptions[category]}</p>
        </div>
      </header>
      <ul className="divide-y divide-[var(--line)]">
        {jobs.length === 0 ? (
          <li className="px-4 py-4 text-sm text-[var(--muted)]">No updates right now. Please check back soon.</li>
        ) : (
          jobs.slice(0, 8).map((job) => (
            <li key={job.id}>
              <Link
                href={`/sarkari-result/${job.slug}`}
                className="row-hover focus-ring flex items-start gap-2 px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--trust-dark)]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--trust)]" aria-hidden="true" />
                <span className="flex-1 leading-5">{job.title}</span>
                {isNew(job) ? (
                  <span className="mt-0.5 shrink-0 animate-pulse rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">New</span>
                ) : null}
              </Link>
            </li>
          ))
        )}
      </ul>
      <Link
        href={`/sarkari-result?category=${category}`}
        className="focus-ring mt-auto inline-flex items-center justify-center gap-1.5 border-t border-[var(--line)] bg-slate-50 px-4 py-3 text-sm font-bold text-[var(--trust-dark)] transition hover:bg-blue-50"
      >
        View all {jobCategoryLabels[category]}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
