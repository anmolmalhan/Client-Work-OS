import type { jobCategories, jobPostStatuses, paymentStatuses, priceTypes, requestStatuses, serviceCategories, urgencyLevels } from "./constants";

export type RequestStatus = (typeof requestStatuses)[number];
export type PaymentStatus = (typeof paymentStatuses)[number];
export type ServiceCategory = (typeof serviceCategories)[number];
export type PriceType = (typeof priceTypes)[number];
export type UrgencyLevel = (typeof urgencyLevels)[number];
export type JobCategory = (typeof jobCategories)[number];
export type JobPostStatus = (typeof jobPostStatuses)[number];

export type BusinessProfile = {
  name: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
  serviceArea: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceType: PriceType;
  estimatedPrice?: number;
  priceNote?: string;
  requiredDocuments: string[];
};

export type PricingCategory = {
  title: string;
  description: string;
  items: Array<{
    label: string;
    price: string;
  }>;
};

export type UploadedDocument = {
  id: string;
  name: string;
  type: "pdf" | "image" | "other";
  isSensitive: boolean;
  status: "received" | "missing" | "needs_review";
};

export type PaymentSummary = {
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: PaymentStatus;
};

export type ClientRequest = {
  id: string;
  requestId: string;
  clientName: string;
  whatsappNumber: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  description: string;
  deadline: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  payment: PaymentSummary;
  documents: UploadedDocument[];
  adminNotes: string[];
  finalOutputFile?: string;
  deliveryConfirmation?: string;
  latestUpdate: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalRequests: number;
  pendingRequests: number;
  paymentPending: number;
  inProgress: number;
  completed: number;
  delivered: number;
  revenueCollected: number;
  balancePending: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

// A single labelled date row for a Sarkari listing (e.g. "Last Date to Apply" -> "2026-07-20").
export type JobImportantDate = {
  label: string;
  value: string;
};

// A Sarkari Result style public job/form listing. Admin-entered; SEO traffic driver.
export type JobPost = {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: JobCategory;
  status: JobPostStatus;
  shortInfo: string;
  vacancies?: number;
  applicationFee?: string;
  eligibility: string;
  ageLimit?: string;
  importantDates: JobImportantDate[];
  applyStartDate?: string;
  applyEndDate?: string;
  applyLink?: string;
  notificationLink?: string;
  officialWebsite?: string;
  metaTitle?: string;
  metaDescription?: string;
  isFeatured: boolean;
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// Lightweight shape used for listing tables and sitemap.
export type JobPostSummary = Pick<
  JobPost,
  "id" | "slug" | "title" | "organization" | "category" | "applyStartDate" | "applyEndDate" | "isFeatured" | "publishedAt"
>;
