import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db, schema } from "@wdsc/db";
import {
  jobCategories,
  jobPosts as demoJobPosts,
  type CreateJobPostInput,
  type JobCategory,
  type JobImportantDate,
  type JobPost,
  type UpdateJobPostInput,
} from "@wdsc/domain";

type JobPostRow = typeof schema.jobPosts.$inferSelect;

function toIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function toJobPost(row: JobPostRow): JobPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    organization: row.organization,
    category: row.category,
    status: row.status,
    shortInfo: row.shortInfo,
    vacancies: row.vacancies ?? undefined,
    applicationFee: row.applicationFee ?? undefined,
    eligibility: row.eligibility,
    ageLimit: row.ageLimit ?? undefined,
    importantDates: (row.importantDates as JobImportantDate[]) ?? [],
    applyStartDate: row.applyStartDate ?? undefined,
    applyEndDate: row.applyEndDate ?? undefined,
    applyLink: row.applyLink ?? undefined,
    notificationLink: row.notificationLink ?? undefined,
    officialWebsite: row.officialWebsite ?? undefined,
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
    isFeatured: row.isFeatured,
    views: row.views,
    publishedAt: toIso(row.publishedAt),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export async function seedJobsIfEmpty() {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(schema.jobPosts);

  if (Number(existing[0]?.count ?? 0) > 0) {
    return;
  }

  await db.insert(schema.jobPosts).values(
    demoJobPosts.map((job) => ({
      slug: job.slug,
      title: job.title,
      organization: job.organization,
      category: job.category,
      status: job.status,
      shortInfo: job.shortInfo,
      vacancies: job.vacancies ?? null,
      applicationFee: job.applicationFee ?? null,
      eligibility: job.eligibility,
      ageLimit: job.ageLimit ?? null,
      importantDates: job.importantDates,
      applyStartDate: job.applyStartDate ?? null,
      applyEndDate: job.applyEndDate ?? null,
      applyLink: job.applyLink ?? null,
      notificationLink: job.notificationLink ?? null,
      officialWebsite: job.officialWebsite ?? null,
      metaTitle: job.metaTitle ?? null,
      metaDescription: job.metaDescription ?? null,
      isFeatured: job.isFeatured,
      views: job.views,
      publishedAt: new Date(job.publishedAt),
    })),
  ).onConflictDoNothing();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(base: string) {
  const root = base || "job";
  const existing = await db
    .select({ slug: schema.jobPosts.slug })
    .from(schema.jobPosts)
    .where(ilike(schema.jobPosts.slug, `${root}%`));
  const taken = new Set(existing.map((row) => row.slug));

  if (!taken.has(root)) {
    return root;
  }

  let suffix = 2;
  while (taken.has(`${root}-${suffix}`)) {
    suffix += 1;
  }
  return `${root}-${suffix}`;
}

export async function listJobs(filter: { category?: string; query?: string } = {}) {
  await seedJobsIfEmpty();

  const conditions = [eq(schema.jobPosts.status, "published" as const)];

  if (filter.category && (jobCategories as readonly string[]).includes(filter.category)) {
    conditions.push(eq(schema.jobPosts.category, filter.category as JobCategory));
  }

  if (filter.query) {
    const pattern = `%${filter.query}%`;
    conditions.push(
      or(ilike(schema.jobPosts.title, pattern), ilike(schema.jobPosts.organization, pattern), ilike(schema.jobPosts.shortInfo, pattern)) ??
        sql`true`,
    );
  }

  const rows = await db
    .select()
    .from(schema.jobPosts)
    .where(and(...conditions))
    .orderBy(desc(schema.jobPosts.publishedAt));

  return rows.map(toJobPost);
}

export async function listJobsGroupedByCategory() {
  const jobs = await listJobs();
  return jobCategories.map((category) => ({
    category,
    jobs: jobs.filter((job) => job.category === category),
  }));
}

export async function getJob(slug: string) {
  await seedJobsIfEmpty();

  // Pure read — no view increment here, because this response is ISR-cached and
  // the write would only fire on a cache miss. Views are counted separately via
  // recordJobView (an uncached POST) from the client.
  const [row] = await db
    .select()
    .from(schema.jobPosts)
    .where(and(eq(schema.jobPosts.slug, slug), eq(schema.jobPosts.status, "published" as const)))
    .limit(1);

  return row ? toJobPost(row) : undefined;
}

export async function recordJobView(slug: string) {
  const [row] = await db
    .update(schema.jobPosts)
    .set({ views: sql`${schema.jobPosts.views} + 1` })
    .where(and(eq(schema.jobPosts.slug, slug), eq(schema.jobPosts.status, "published" as const)))
    .returning({ views: schema.jobPosts.views });

  return row?.views;
}

export async function createJob(input: CreateJobPostInput) {
  const slug = await uniqueSlug(slugify(input.title));

  const [row] = await db
    .insert(schema.jobPosts)
    .values({
      slug,
      title: input.title,
      organization: input.organization,
      category: input.category,
      status: input.status,
      shortInfo: input.shortInfo,
      vacancies: input.vacancies ?? null,
      applicationFee: input.applicationFee || null,
      eligibility: input.eligibility,
      ageLimit: input.ageLimit || null,
      importantDates: input.importantDates,
      applyStartDate: input.applyStartDate ?? null,
      applyEndDate: input.applyEndDate ?? null,
      applyLink: input.applyLink || null,
      notificationLink: input.notificationLink || null,
      officialWebsite: input.officialWebsite || null,
      metaTitle: input.metaTitle || null,
      metaDescription: input.metaDescription || null,
      isFeatured: input.isFeatured,
    })
    .returning();

  if (!row) {
    throw new Error("Unable to create job post.");
  }

  return toJobPost(row);
}

// Optional text fields that should store NULL (not "") when cleared, matching
// createJob's `|| null` normalization so e.g. an emptied metaTitle falls back
// to its default instead of rendering an empty tag.
const nullableJobTextFields = [
  "applicationFee",
  "ageLimit",
  "applyLink",
  "notificationLink",
  "officialWebsite",
  "metaTitle",
  "metaDescription",
] as const;

export async function updateJob(slug: string, input: UpdateJobPostInput) {
  const updates: Record<string, unknown> = { ...input };
  for (const field of nullableJobTextFields) {
    if (field in updates && !updates[field]) {
      updates[field] = null;
    }
  }

  const [row] = await db
    .update(schema.jobPosts)
    .set(updates as Partial<typeof schema.jobPosts.$inferInsert>)
    .where(eq(schema.jobPosts.slug, slug))
    .returning();

  return row ? toJobPost(row) : undefined;
}

export async function deleteJob(slug: string) {
  const deleted = await db.delete(schema.jobPosts).where(eq(schema.jobPosts.slug, slug)).returning({ id: schema.jobPosts.id });
  return deleted.length > 0;
}
