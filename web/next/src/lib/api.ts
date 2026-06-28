import {
  getJobPostBySlug,
  getJobPostsGroupedByCategory,
  getPublishedJobPosts,
  type JobCategory,
  type JobPost,
} from "@wdsc/domain";
import { rpc } from "./rpc";

type JobCategoryGroup = { category: JobCategory; jobs: JobPost[] };

// Next.js extends RequestInit with `next` (revalidate/tags); the Hono client
// forwards this `init` straight to fetch.
const cache = (revalidate: number) => ({ init: { next: { revalidate } } as RequestInit });

function filterSeed({ category, query }: { category?: string; query?: string }) {
  let jobs = getPublishedJobPosts();
  if (category) {
    jobs = jobs.filter((job) => job.category === category);
  }
  if (query) {
    const value = query.trim().toLowerCase();
    jobs = jobs.filter((job) => [job.title, job.organization, job.shortInfo].some((field) => field.toLowerCase().includes(value)));
  }
  return jobs;
}

// Falls back to the bundled domain seed data if the API is unreachable (build
// time, API down) so the public SEO pages always render.
async function withFallback<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

export async function fetchJobs(params: { category?: string; query?: string } = {}) {
  return withFallback(async () => {
    const response = await rpc.jobs.$get({ query: { category: params.category, query: params.query } }, cache(60));
    if (!response.ok) {
      throw new Error("jobs request failed");
    }
    const body = await response.json();
    return body.data as JobPost[];
  }, filterSeed(params));
}

export async function fetchJobsGroupedByCategory() {
  return withFallback(async () => {
    const response = await rpc.jobs.$get({ query: { grouped: "true" } }, cache(60));
    if (!response.ok) {
      throw new Error("jobs request failed");
    }
    const body = await response.json();
    return body.data as JobCategoryGroup[];
  }, getJobPostsGroupedByCategory());
}

export async function fetchJob(slug: string) {
  return withFallback<JobPost | null>(async () => {
    const response = await rpc.jobs[":slug"].$get({ param: { slug } }, cache(60));
    if (!response.ok) {
      throw new Error("job request failed");
    }
    const body = await response.json();
    return "data" in body ? (body.data as JobPost) : null;
  }, getJobPostBySlug(slug, getPublishedJobPosts()) ?? null);
}
