import { jobCategories, jobCategoryLabels } from "@wdsc/domain";
import { ClipboardCheck, MessageCircle, Search, Sparkles } from "lucide-react";
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

  const [filtered, grouped, allJobs] = await Promise.all([
    isFiltered ? fetchJobs({ category: activeCategory, query }) : Promise.resolve([]),
    isFiltered ? Promise.resolve([]) : fetchJobsGroupedByCategory(),
    fetchJobs(),
  ]);
  const published = allJobs.length;

  return (
    <div>
      <section className="gradient-hero relative overflow-hidden">
        <div className="section-fade page-shell relative py-10 sm:py-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-white backdrop-blur">
            <Sparkles className="size-4 text-[var(--amber)]" aria-hidden="true" />
            Sarkari Result 2026
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl">
            Latest Government Jobs, Forms{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">&amp; Results</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/90 sm:text-lg">
            Daily updates on new Sarkari Naukri vacancies, online forms, results and admit cards. Found a form you want?
            We fill and submit it for you on WhatsApp.
          </p>

          <form action="/sarkari-result" className="mt-7 flex max-w-2xl gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search government jobs</span>
              <Search className="pointer-events-none absolute left-4 top-4 size-5 text-[var(--muted)]" aria-hidden="true" />
              <input
                name="query"
                defaultValue={query ?? ""}
                placeholder="Search by post, department, exam…"
                className="focus-ring min-h-[52px] w-full rounded-xl border border-white/20 bg-white px-3 py-3.5 pl-11 text-sm shadow-xl"
              />
            </label>
            <button
              type="submit"
              className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[var(--amber)] px-6 text-sm font-bold text-[var(--navy)] shadow-xl transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Search
            </button>
          </form>

          <dl className="mt-7 flex flex-wrap gap-3">
            {[
              { value: `${published} Live`, label: "Listings" },
              { value: "Daily", label: "Updates" },
              { value: "Free", label: "Job Alerts" },
              { value: "WhatsApp", label: "Apply Help" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl px-4 py-2.5 text-white">
                <dd className="text-lg font-black leading-none">{stat.value}</dd>
                <dt className="mt-1 text-xs font-semibold text-blue-100/80">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <nav aria-label="Job categories" className="mt-6 flex flex-wrap gap-2">
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
          <div className="grid items-start gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {grouped
              .filter((group) => group.jobs.length > 0)
              .map((group, index) => (
                <JobList category={group.category} jobs={group.jobs} index={index} key={group.category} />
              ))}
          </div>
        </section>
      )}

      <section className="page-shell section-fade pb-12">
        <div className="gradient-hero relative overflow-hidden rounded-3xl p-7 text-white shadow-[0_30px_70px_rgba(29,63,176,0.35)] sm:p-10">
          <Sparkles className="absolute right-6 top-6 size-20 text-white/10" aria-hidden="true" />
          <h2 className="relative text-2xl font-black sm:text-3xl">Confused about filling a form?</h2>
          <p className="relative mt-2 max-w-2xl text-sm leading-6 text-blue-100/90 sm:text-base">
            Skip the portal errors. Swift Digital Seva fills your online form, resizes the photo and signature, uploads
            documents, and shares submission proof on WhatsApp. Price is confirmed before work starts.
          </p>
          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
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
          ? "bg-white text-[var(--trust-dark)] shadow-lg"
          : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
      }`}
    >
      {label}
    </Link>
  );
}
