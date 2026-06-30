"use client";

import { jobCategories, jobCategoryLabels, type JobCategory, type JobPost } from "@wdsc/domain";
import { ClipboardCheck, MessageCircle, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { JobCard } from "@/components/jobs/job-card";
import { JobList } from "@/components/jobs/job-list";
import { ActionButton } from "@/components/marketing/action-button";
import { SectionHeading } from "@/components/marketing/section-heading";

type Grouped = { category: JobCategory; jobs: JobPost[] };

function isValidCategory(value: string): value is JobCategory {
  return (jobCategories as readonly string[]).includes(value);
}

// Client-side explorer so the page can be statically rendered + ISR-cached
// (no searchParams -> no per-request dynamic render). Search and category
// filtering happen instantly in the browser over the pre-loaded listings.
export function SarkariExplorer({ allJobs, grouped }: { allJobs: JobPost[]; grouped: Grouped[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JobCategory | null>(null);

  // Preserve deep-links: /sarkari-result#result selects that category on load.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveCategory(hash && isValidCategory(hash) ? hash : null);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const isFiltered = Boolean(trimmed || activeCategory);

  const filtered = useMemo(() => {
    if (!isFiltered) return [];
    return allJobs.filter((job) => {
      const matchCategory = !activeCategory || job.category === activeCategory;
      const matchQuery = !trimmed || [job.title, job.organization, job.shortInfo].some((field) => field.toLowerCase().includes(trimmed));
      return matchCategory && matchQuery;
    });
  }, [allJobs, activeCategory, trimmed, isFiltered]);

  const groupsToShow = grouped.filter((group) => group.jobs.length > 0);

  function reset() {
    setActiveCategory(null);
    setQuery("");
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }

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
            Daily updates on new Sarkari Naukri vacancies, online forms, results and admit cards. Found a form you want? We
            fill and submit it for you on WhatsApp.
          </p>

          <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-7 flex max-w-2xl gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search government jobs</span>
              <Search className="pointer-events-none absolute left-4 top-4 size-5 text-[var(--muted)]" aria-hidden="true" />
              <input
                name="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
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
              { value: `${allJobs.length} Live`, label: "Listings" },
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
            <CategoryChip label="All" active={!isFiltered} onClick={reset} />
            {jobCategories.map((item) => (
              <CategoryChip key={item} label={jobCategoryLabels[item]} active={activeCategory === item} onClick={() => setActiveCategory(item)} />
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
              <button type="button" onClick={reset} className="font-bold text-[var(--trust-dark)] hover:underline">
                view all updates
              </button>
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
            {groupsToShow.map((group, index) => (
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

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
        active ? "bg-white text-[var(--trust-dark)] shadow-lg" : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}
