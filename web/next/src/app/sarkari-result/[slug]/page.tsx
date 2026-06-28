import { getPublishedJobPosts, jobCategoryLabels, type JobPost } from "@wdsc/domain";
import { Building2, ExternalLink, FileText, Globe, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyHelpCta } from "@/components/jobs/apply-cta";
import { ImportantDates } from "@/components/jobs/important-dates";
import { JobViewTracker } from "@/components/jobs/job-view-tracker";
import { SectionHeading } from "@/components/marketing/section-heading";
import { fetchJob } from "@/lib/api";
import { applyDeadlineLabel, formatDate } from "@/lib/format";

export const revalidate = 300;

// Pre-render the known seed listings; new admin entries render on demand.
export async function generateStaticParams() {
  return getPublishedJobPosts().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchJob(slug);

  if (!job) {
    return { title: "Listing not found | Sarkari Result" };
  }

  const title = job.metaTitle ?? `${job.title} | Sarkari Result 2026`;
  const description = job.metaDescription ?? job.shortInfo.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `/sarkari-result/${job.slug}` },
    openGraph: { title, description, type: "article" },
  };
}

function jobPostingJsonLd(job: JobPost) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.shortInfo,
    datePosted: job.publishedAt,
    validThrough: job.applyEndDate,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.organization,
      sameAs: job.officialWebsite,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    ...(typeof job.vacancies === "number" ? { totalJobOpenings: job.vacancies } : {}),
  };
}

const linkRows = [
  { key: "applyLink" as const, label: "Apply Online", primary: true },
  { key: "notificationLink" as const, label: "Download Notification", primary: false },
  { key: "officialWebsite" as const, label: "Official Website", primary: false },
];

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await fetchJob(slug);

  if (!job) {
    notFound();
  }

  const deadline = applyDeadlineLabel(job.applyEndDate);

  return (
    <div className="page-shell py-8 sm:py-10">
      <JobViewTracker slug={job.slug} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-[var(--muted)]">
        <Link href="/sarkari-result" className="hover:text-[var(--trust-dark)]">
          Sarkari Result
        </Link>
        <span className="px-2">/</span>
        <Link href={`/sarkari-result?category=${job.category}`} className="hover:text-[var(--trust-dark)]">
          {jobCategoryLabels[job.category]}
        </Link>
      </nav>

      <header className="mt-4 rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase text-[var(--trust-dark)]">
            {jobCategoryLabels[job.category]}
          </span>
          {deadline ? (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                deadline.tone === "closed"
                  ? "bg-slate-100 text-slate-600 ring-slate-200"
                  : deadline.tone === "soon"
                    ? "bg-amber-50 text-amber-800 ring-amber-200"
                    : "bg-emerald-50 text-emerald-700 ring-emerald-200"
              }`}
            >
              {deadline.text}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--navy)] sm:text-3xl">{job.title}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)]">
          <Building2 className="size-4 shrink-0" aria-hidden="true" />
          {job.organization}
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">{job.shortInfo}</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[var(--muted)]">
          {typeof job.vacancies === "number" ? (
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4" aria-hidden="true" />
              {job.vacancies.toLocaleString("en-IN")} Total Posts
            </span>
          ) : null}
          {job.applyEndDate ? <span>Last Date: {formatDate(job.applyEndDate)}</span> : null}
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading title="Important Dates" />
            <div className="mt-4">
              <ImportantDates dates={job.importantDates} />
            </div>
          </section>

          <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading title="Eligibility &amp; Details" />
            <dl className="mt-4 divide-y divide-[var(--line)] text-sm">
              <DetailRow label="Eligibility" value={job.eligibility} />
              {job.ageLimit ? <DetailRow label="Age Limit" value={job.ageLimit} /> : null}
              {job.applicationFee ? <DetailRow label="Application Fee" value={job.applicationFee} /> : null}
              {typeof job.vacancies === "number" ? (
                <DetailRow label="Total Vacancies" value={job.vacancies.toLocaleString("en-IN")} />
              ) : null}
            </dl>
          </section>

          <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading title="Important Links" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {linkRows.map((row) => {
                const href = job[row.key];
                if (!href) {
                  return null;
                }
                return (
                  <a
                    key={row.key}
                    href={href}
                    target="_blank"
                    rel="noreferrer nofollow"
                    className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
                      row.primary
                        ? "bg-[var(--trust)] text-white hover:bg-[var(--trust-dark)]"
                        : "border border-[var(--line)] bg-white text-[var(--foreground)] hover:border-[var(--trust)] hover:text-[var(--trust-dark)]"
                    }`}
                  >
                    {row.key === "officialWebsite" ? (
                      <Globe className="size-4" aria-hidden="true" />
                    ) : row.key === "notificationLink" ? (
                      <FileText className="size-4" aria-hidden="true" />
                    ) : (
                      <ExternalLink className="size-4" aria-hidden="true" />
                    )}
                    {row.label}
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Always verify details on the official website before applying. Dates and links are shared for guidance.
            </p>
          </section>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <ApplyHelpCta job={job} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr]">
      <dt className="font-bold text-[var(--muted)]">{label}</dt>
      <dd className="text-[var(--foreground)]">{value}</dd>
    </div>
  );
}
