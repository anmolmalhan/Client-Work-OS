import type { Metadata } from "next";
import { SarkariExplorer } from "@/components/jobs/sarkari-explorer";
import { fetchJobs, fetchJobsGroupedByCategory } from "@/lib/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sarkari Result 2026 - Latest Govt Jobs, Forms, Results & Admit Cards",
  description:
    "Find the latest Sarkari Result, government job vacancies, online application forms, results, admit cards and answer keys 2026. Free job alerts and form filling help.",
  keywords: ["sarkari result", "latest government jobs", "online form", "sarkari naukri", "admit card", "result 2026"],
  alternates: { canonical: "/sarkari-result" },
};

export default async function SarkariResultPage() {
  // No searchParams here, so the page is statically generated and ISR-cached
  // (revalidate above). Search + category filtering run client-side in the
  // explorer over the pre-loaded listings.
  const [allJobs, grouped] = await Promise.all([fetchJobs(), fetchJobsGroupedByCategory()]);

  return <SarkariExplorer allJobs={allJobs} grouped={grouped} />;
}
