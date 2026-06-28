import { jobCategoryDescriptions, jobCategoryLabels, type JobCategory, type JobPost } from "@wdsc/domain";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { daysUntil } from "@/lib/format";

// A listing is flagged "New" for its first 7 days.
function isNew(job: JobPost) {
  return daysUntil(job.publishedAt) >= -7;
}

const categoryAccent: Record<JobCategory, string> = {
  latest_job: "text-[var(--trust-dark)]",
  result: "text-emerald-700",
  admit_card: "text-amber-700",
  answer_key: "text-purple-700",
  syllabus: "text-slate-700",
};

export function JobList({ category, jobs }: { category: JobCategory; jobs: JobPost[] }) {
  return (
    <section className="flex h-full flex-col rounded-lg border border-[var(--line)] bg-white shadow-sm">
      <header className="border-b border-[var(--line)] bg-slate-50 px-4 py-3">
        <h2 className={`text-base font-bold ${categoryAccent[category]}`}>{jobCategoryLabels[category]}</h2>
        <p className="mt-0.5 text-xs text-[var(--muted)]">{jobCategoryDescriptions[category]}</p>
      </header>
      <ul className="flex-1 divide-y divide-[var(--line)]">
        {jobs.length === 0 ? (
          <li className="px-4 py-4 text-sm text-[var(--muted)]">No updates right now. Please check back soon.</li>
        ) : (
          jobs.slice(0, 8).map((job) => (
            <li key={job.id}>
              <Link
                href={`/sarkari-result/${job.slug}`}
                className="focus-ring flex items-start gap-2 px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-blue-50/60 hover:text-[var(--trust-dark)]"
              >
                <span className="flex-1 leading-5">{job.title}</span>
                {isNew(job) ? (
                  <span className="mt-0.5 shrink-0 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">New</span>
                ) : null}
              </Link>
            </li>
          ))
        )}
      </ul>
      <Link
        href={`/sarkari-result?category=${category}`}
        className="focus-ring inline-flex items-center justify-center gap-1.5 border-t border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--trust-dark)] hover:bg-blue-50"
      >
        View all {jobCategoryLabels[category]}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
