"use client";

import { jobCategoryLabels, type JobPost } from "@wdsc/domain";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JobForm } from "@/components/admin/job-form";
import { formatDate } from "@/lib/format";
import { rpc } from "@/lib/rpc";

async function fetchJobs(): Promise<JobPost[]> {
  const response = await rpc.jobs.$get({ query: {} });
  if (!response.ok) {
    throw new Error("Failed to load listings");
  }
  const body = await response.json();
  return body.data as JobPost[];
}

export function JobsManager() {
  const { data: jobs = [], isLoading, isError } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 className="mb-3 text-lg font-bold">Add new listing</h2>
        <JobForm />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold">Published listings{isLoading ? "" : ` (${jobs.length})`}</h2>
        {isError ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Could not reach the API. Make sure it is running on port 4100.
          </p>
        ) : isLoading ? (
          <ul className="divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] bg-white shadow-sm">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <li key={id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-2.5 w-2/5 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="size-6 animate-pulse rounded-full bg-slate-100" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] bg-white shadow-sm">
            {jobs.map((job) => (
              <li key={job.id} className="flex items-start justify-between gap-3 px-4 py-3">
                <div>
                  <Link href={`/sarkari-result/${job.slug}`} className="text-sm font-bold hover:text-[var(--trust-dark)]" target="_blank">
                    {job.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {jobCategoryLabels[job.category]} · {job.views.toLocaleString("en-IN")} views · {formatDate(job.publishedAt)}
                  </p>
                </div>
                {job.isFeatured ? (
                  <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
                    Featured
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-[var(--muted)]">New listings appear here instantly after publishing — no page refresh needed.</p>
      </div>
    </div>
  );
}
