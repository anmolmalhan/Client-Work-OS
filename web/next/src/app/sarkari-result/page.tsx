import { jobCategories, jobCategoryLabels } from "@wdsc/domain";
import { ClipboardCheck, MessageCircle, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JobCard } from "@/components/jobs/job-card";
import { JobList } from "@/components/jobs/job-list";
import { ActionButton } from "@/components/marketing/action-button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { fetchJobs, fetchJobsGroupedByCategory } from "@/lib/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sarkari Result 2026 - Latest Govt Jobs, Forms, Results & Admit Cards",
  description:
    "Find the latest Sarkari Result, government job vacancies, online application forms, results, admit cards and answer keys 2026. Free job alerts and form filling help.",
  keywords: ["sarkari result", "latest government jobs", "online form", "sarkari naukri", "admit card", "result 2026"],
  alternates: { canonical: "/sarkari-result" },
};

function isValidCategory(value?: string): value is (typeof jobCategories)[number] {
  return Boolean(value) && (jobCategories as readonly string[]).includes(value as string);
}

export default async function SarkariResultPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; query?: string }>;
}) {
  const { category, query } = await searchParams;
  const activeCategory = isValidCategory(category) ? category : undefined;
  const isFiltered = Boolean(activeCategory || query);

  const [filtered, grouped] = await Promise.all([
    isFiltered ? fetchJobs({ category: activeCategory, query }) : Promise.resolve([]),
    isFiltered ? Promise.resolve([]) : fetchJobsGroupedByCategory(),
  ]);

  return (
    <div>
      <section className="sunny-panel border-b border-[var(--line)]">
        <div className="page-shell py-8 sm:py-12">
          <p className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-bold text-[var(--trust-dark)] shadow-sm">
            Sarkari Result 2026
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] sm:text-4xl">
            Latest Government Jobs, Forms &amp; Results
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Daily updates on new Sarkari Naukri vacancies, online application forms, results, admit cards and answer
            keys. Found a form you want to apply for? We can fill and submit it for you on WhatsApp.
          </p>

          <form action="/sarkari-result" className="mt-6 flex max-w-xl gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search government jobs</span>
              <Search className="pointer-events-none absolute left-3 top-3.5 size-5 text-[var(--muted)]" aria-hidden="true" />
              <input
                name="query"
                defaultValue={query ?? ""}
                placeholder="Search by post, department, exam…"
                className="focus-ring min-h-12 w-full rounded-md border border-[var(--line)] bg-white px-3 pl-10 text-sm"
              />
            </label>
            <button
              type="submit"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--trust)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--trust-dark)]"
            >
              Search
            </button>
          </form>

          <nav aria-label="Job categories" className="mt-5 flex flex-wrap gap-2">
            <CategoryChip href="/sarkari-result" label="All" active={!activeCategory && !query} />
            {jobCategories.map((item) => (
              <CategoryChip
                key={item}
                href={`/sarkari-result?category=${item}`}
                label={jobCategoryLabels[item]}
                active={activeCategory === item}
              />
            ))}
          </nav>
        </div>
      </section>

      {isFiltered ? (
        <section className="page-shell section-fade py-10">
          <SectionHeading
            title={activeCategory ? jobCategoryLabels[activeCategory] : `Search results for “${query}”`}
            description={`${filtered.length} listing${filtered.length === 1 ? "" : "s"} found.`}
          />
          {filtered.length === 0 ? (
            <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)]">
              No listings matched. Try another category or{" "}
              <Link href="/sarkari-result" className="font-bold text-[var(--trust-dark)] hover:underline">
                view all updates
              </Link>
              .
            </p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((job, index) => (
                <JobCard job={job} index={index} key={job.id} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="page-shell section-fade py-10">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {grouped
              .filter((group) => group.jobs.length > 0)
              .map((group) => (
                <JobList category={group.category} jobs={group.jobs} key={group.category} />
              ))}
          </div>
        </section>
      )}

      <section className="page-shell section-fade pb-12">
        <div className="rounded-lg bg-[var(--navy)] p-6 text-white shadow-[0_22px_52px_rgba(15,23,42,0.2)] sm:p-8">
          <h2 className="text-2xl font-bold">Confused about filling a form?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Skip the portal errors. Swift Digital Seva fills your online form, resizes the photo and signature, uploads
            documents, and shares submission proof on WhatsApp. Price is confirmed before work starts.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ActionButton href="/submit-request" icon={ClipboardCheck} variant="whatsapp">
              Get Form Filling Help
            </ActionButton>
            <ActionButton href="/services" icon={MessageCircle} variant="secondary">
              View All Services
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`focus-ring rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
        active
          ? "bg-[var(--trust)] text-white"
          : "border border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--trust)] hover:text-[var(--trust-dark)]"
      }`}
    >
      {label}
    </Link>
  );
}
