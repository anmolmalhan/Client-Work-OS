import { jobCategories } from "./constants";
import type { JobCategory, JobPost, JobPostSummary } from "./types";

// Seed Sarkari Result listings. These power the public SEO pages until the
// jobPosts database table is connected; admins will manage real entries later.
export const jobPosts: JobPost[] = [
  {
    id: "job-ssc-cgl-2026",
    slug: "ssc-cgl-2026-online-form",
    title: "SSC CGL 2026 Online Form",
    organization: "Staff Selection Commission (SSC)",
    category: "latest_job",
    status: "published",
    shortInfo:
      "Staff Selection Commission has released the notification for Combined Graduate Level (CGL) Examination 2026 for various Group B and Group C posts. Eligible graduates can apply online.",
    vacancies: 17727,
    applicationFee: "General/OBC: Rs 100, SC/ST/PwD/Women: Exempted",
    eligibility: "Bachelor's degree in any stream from a recognised university.",
    ageLimit: "18 to 32 years (age relaxation as per rules).",
    importantDates: [
      { label: "Application Begin", value: "2026-06-24" },
      { label: "Last Date to Apply", value: "2026-07-24" },
      { label: "Last Date for Fee Payment", value: "2026-07-25" },
      { label: "Exam Date (Tier 1)", value: "2026-09-15" },
    ],
    applyStartDate: "2026-06-24",
    applyEndDate: "2026-07-24",
    applyLink: "https://ssc.gov.in",
    notificationLink: "https://ssc.gov.in",
    officialWebsite: "https://ssc.gov.in",
    metaTitle: "SSC CGL 2026 Online Form - Apply Online for 17727 Posts",
    metaDescription:
      "SSC CGL 2026 notification out for 17727 Group B & C posts. Check eligibility, important dates, application fee and apply online before 24 July 2026.",
    isFeatured: true,
    views: 18420,
    publishedAt: "2026-06-24T06:00:00.000Z",
    createdAt: "2026-06-24T06:00:00.000Z",
    updatedAt: "2026-06-24T06:00:00.000Z",
  },
  {
    id: "job-rrb-ntpc-2026",
    slug: "rrb-ntpc-2026-recruitment",
    title: "Railway RRB NTPC 2026 Recruitment",
    organization: "Railway Recruitment Board (RRB)",
    category: "latest_job",
    status: "published",
    shortInfo:
      "Railway Recruitment Board invites online applications for Non-Technical Popular Categories (NTPC) graduate and undergraduate level posts across all RRB zones.",
    vacancies: 11558,
    applicationFee: "General/OBC: Rs 500, SC/ST/PwD/Women: Rs 250",
    eligibility: "12th pass / Graduate as per the post applied for.",
    ageLimit: "18 to 33 years (age relaxation as per rules).",
    importantDates: [
      { label: "Application Begin", value: "2026-06-20" },
      { label: "Last Date to Apply", value: "2026-07-20" },
      { label: "Last Date for Fee Payment", value: "2026-07-22" },
    ],
    applyStartDate: "2026-06-20",
    applyEndDate: "2026-07-20",
    applyLink: "https://www.rrbcdg.gov.in",
    notificationLink: "https://www.rrbcdg.gov.in",
    officialWebsite: "https://www.rrbcdg.gov.in",
    metaTitle: "RRB NTPC 2026 Recruitment - 11558 Railway Vacancies Apply Online",
    metaDescription:
      "Railway RRB NTPC 2026 online form for 11558 posts. Check eligibility, age limit, fee and important dates. Apply online before 20 July 2026.",
    isFeatured: true,
    views: 24310,
    publishedAt: "2026-06-20T05:30:00.000Z",
    createdAt: "2026-06-20T05:30:00.000Z",
    updatedAt: "2026-06-20T05:30:00.000Z",
  },
  {
    id: "job-ibps-po-2026",
    slug: "ibps-po-2026-notification",
    title: "IBPS PO / MT 2026 Notification",
    organization: "Institute of Banking Personnel Selection (IBPS)",
    category: "latest_job",
    status: "published",
    shortInfo:
      "IBPS has invited online applications for the recruitment of Probationary Officers / Management Trainees in participating public sector banks.",
    vacancies: 4455,
    applicationFee: "General/OBC: Rs 850, SC/ST/PwD: Rs 175",
    eligibility: "Graduation degree in any discipline from a recognised university.",
    ageLimit: "20 to 30 years (age relaxation as per rules).",
    importantDates: [
      { label: "Application Begin", value: "2026-06-26" },
      { label: "Last Date to Apply", value: "2026-07-16" },
      { label: "Prelims Exam Date", value: "2026-08-22" },
    ],
    applyStartDate: "2026-06-26",
    applyEndDate: "2026-07-16",
    applyLink: "https://www.ibps.in",
    notificationLink: "https://www.ibps.in",
    officialWebsite: "https://www.ibps.in",
    isFeatured: false,
    views: 9120,
    publishedAt: "2026-06-26T04:00:00.000Z",
    createdAt: "2026-06-26T04:00:00.000Z",
    updatedAt: "2026-06-26T04:00:00.000Z",
  },
  {
    id: "job-upsc-cse-2026",
    slug: "upsc-civil-services-2026",
    title: "UPSC Civil Services (IAS) 2026 Online Form",
    organization: "Union Public Service Commission (UPSC)",
    category: "latest_job",
    status: "published",
    shortInfo:
      "UPSC invites online applications for the Civil Services Examination 2026 for recruitment to IAS, IPS, IFS and other allied services.",
    vacancies: 979,
    applicationFee: "General/OBC: Rs 100, SC/ST/PwD/Women: Exempted",
    eligibility: "Bachelor's degree in any discipline from a recognised university.",
    ageLimit: "21 to 32 years (age relaxation as per rules).",
    importantDates: [
      { label: "Application Begin", value: "2026-06-14" },
      { label: "Last Date to Apply", value: "2026-07-04" },
      { label: "Prelims Exam Date", value: "2026-09-27" },
    ],
    applyStartDate: "2026-06-14",
    applyEndDate: "2026-07-04",
    applyLink: "https://upsconline.nic.in",
    notificationLink: "https://upsc.gov.in",
    officialWebsite: "https://upsc.gov.in",
    isFeatured: false,
    views: 15760,
    publishedAt: "2026-06-14T05:00:00.000Z",
    createdAt: "2026-06-14T05:00:00.000Z",
    updatedAt: "2026-06-14T05:00:00.000Z",
  },
  {
    id: "job-ssc-gd-result-2026",
    slug: "ssc-gd-constable-2026-result",
    title: "SSC GD Constable 2026 Result",
    organization: "Staff Selection Commission (SSC)",
    category: "result",
    status: "published",
    shortInfo:
      "Staff Selection Commission has declared the result for the GD Constable Examination 2026. Candidates can check their result and cut-off marks using the link below.",
    eligibility: "Candidates who appeared in the SSC GD Constable 2026 CBT exam.",
    importantDates: [
      { label: "Exam Date", value: "2026-02-20" },
      { label: "Result Declared", value: "2026-06-22" },
    ],
    notificationLink: "https://ssc.gov.in",
    officialWebsite: "https://ssc.gov.in",
    metaTitle: "SSC GD Constable 2026 Result Declared - Check Now",
    metaDescription:
      "SSC GD Constable 2026 result and cut-off marks declared. Check your result with roll number on the official SSC portal.",
    isFeatured: false,
    views: 30210,
    publishedAt: "2026-06-22T11:00:00.000Z",
    createdAt: "2026-06-22T11:00:00.000Z",
    updatedAt: "2026-06-22T11:00:00.000Z",
  },
  {
    id: "job-ibps-clerk-result-2026",
    slug: "ibps-clerk-2026-prelims-result",
    title: "IBPS Clerk 2026 Prelims Result",
    organization: "Institute of Banking Personnel Selection (IBPS)",
    category: "result",
    status: "published",
    shortInfo:
      "IBPS has released the preliminary examination result for the Clerk 2026 recruitment. Qualified candidates can appear for the mains examination.",
    eligibility: "Candidates who appeared in the IBPS Clerk 2026 prelims exam.",
    importantDates: [
      { label: "Prelims Exam", value: "2026-05-24" },
      { label: "Result Declared", value: "2026-06-18" },
    ],
    notificationLink: "https://www.ibps.in",
    officialWebsite: "https://www.ibps.in",
    isFeatured: false,
    views: 12030,
    publishedAt: "2026-06-18T10:00:00.000Z",
    createdAt: "2026-06-18T10:00:00.000Z",
    updatedAt: "2026-06-18T10:00:00.000Z",
  },
  {
    id: "job-rrb-ntpc-admit-2026",
    slug: "rrb-ntpc-2026-admit-card",
    title: "RRB NTPC 2026 CBT-1 Admit Card",
    organization: "Railway Recruitment Board (RRB)",
    category: "admit_card",
    status: "published",
    shortInfo:
      "Railway Recruitment Board has released the CBT-1 admit card for NTPC 2026. Candidates can download their e-call letter using registration number and date of birth.",
    eligibility: "Registered candidates for RRB NTPC 2026 CBT-1 examination.",
    importantDates: [
      { label: "Admit Card Available", value: "2026-06-25" },
      { label: "Exam Date", value: "2026-07-05" },
    ],
    notificationLink: "https://www.rrbcdg.gov.in",
    officialWebsite: "https://www.rrbcdg.gov.in",
    metaTitle: "RRB NTPC 2026 Admit Card Download - CBT-1 Call Letter",
    metaDescription:
      "Download RRB NTPC 2026 CBT-1 admit card. Check exam date, city and shift details using your registration number on the official RRB website.",
    isFeatured: false,
    views: 21540,
    publishedAt: "2026-06-25T07:00:00.000Z",
    createdAt: "2026-06-25T07:00:00.000Z",
    updatedAt: "2026-06-25T07:00:00.000Z",
  },
  {
    id: "job-ssc-cgl-admit-2026",
    slug: "ssc-cgl-2026-tier-1-admit-card",
    title: "SSC CGL 2026 Tier-1 Admit Card",
    organization: "Staff Selection Commission (SSC)",
    category: "admit_card",
    status: "published",
    shortInfo:
      "SSC will release the Tier-1 admit card for CGL 2026 region wise. Candidates can download the hall ticket from their respective regional SSC websites.",
    eligibility: "Candidates registered for SSC CGL 2026 Tier-1 examination.",
    importantDates: [
      { label: "Admit Card Available", value: "2026-09-05" },
      { label: "Exam Date", value: "2026-09-15" },
    ],
    notificationLink: "https://ssc.gov.in",
    officialWebsite: "https://ssc.gov.in",
    isFeatured: false,
    views: 6720,
    publishedAt: "2026-06-26T09:00:00.000Z",
    createdAt: "2026-06-26T09:00:00.000Z",
    updatedAt: "2026-06-26T09:00:00.000Z",
  },
  {
    id: "job-ssc-cgl-syllabus-2026",
    slug: "ssc-cgl-2026-syllabus-exam-pattern",
    title: "SSC CGL 2026 Syllabus & Exam Pattern",
    organization: "Staff Selection Commission (SSC)",
    category: "syllabus",
    status: "published",
    shortInfo:
      "Detailed Tier-1 and Tier-2 syllabus and exam pattern for SSC CGL 2026, including subject-wise marks, number of questions and negative marking scheme.",
    eligibility: "Candidates preparing for SSC CGL 2026.",
    importantDates: [{ label: "Notification Released", value: "2026-06-24" }],
    notificationLink: "https://ssc.gov.in",
    officialWebsite: "https://ssc.gov.in",
    isFeatured: false,
    views: 4980,
    publishedAt: "2026-06-24T08:00:00.000Z",
    createdAt: "2026-06-24T08:00:00.000Z",
    updatedAt: "2026-06-24T08:00:00.000Z",
  },
];

function byNewest(a: JobPost, b: JobPost) {
  return a.publishedAt < b.publishedAt ? 1 : -1;
}

export function getPublishedJobPosts(items: JobPost[] = jobPosts) {
  return items.filter((job) => job.status === "published").toSorted(byNewest);
}

export function getJobPostBySlug(slug: string, items: JobPost[] = jobPosts) {
  return items.find((job) => job.slug === slug);
}

export function getJobPostsByCategory(category: JobCategory, items: JobPost[] = jobPosts) {
  return getPublishedJobPosts(items).filter((job) => job.category === category);
}

export function getFeaturedJobPosts(items: JobPost[] = jobPosts) {
  return getPublishedJobPosts(items).filter((job) => job.isFeatured);
}

// Group published listings by category, preserving the canonical category order.
export function getJobPostsGroupedByCategory(items: JobPost[] = jobPosts) {
  const published = getPublishedJobPosts(items);
  return jobCategories.map((category) => ({
    category,
    jobs: published.filter((job) => job.category === category),
  }));
}

export function toJobPostSummary(job: JobPost): JobPostSummary {
  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    organization: job.organization,
    category: job.category,
    applyStartDate: job.applyStartDate,
    applyEndDate: job.applyEndDate,
    isFeatured: job.isFeatured,
    publishedAt: job.publishedAt,
  };
}
