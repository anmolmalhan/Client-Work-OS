import { z } from "zod";
import { jobCategories, jobPostStatuses, requestStatuses, serviceCategories, urgencyLevels } from "./constants";

export const submitRequestSchema = z.object({
  fullName: z.string().trim().min(2),
  whatsappNumber: z.string().trim().min(10),
  email: z.string().email().optional().or(z.literal("")),
  serviceId: z.string().min(1),
  description: z.string().trim().min(10),
  deadline: z.string().date().optional(),
  urgency: z.enum(urgencyLevels).default("normal"),
  consentGiven: z.literal(true),
});

export const trackRequestSchema = z.object({
  requestId: z.string().trim().min(4),
  whatsappNumber: z.string().trim().min(10),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum(requestStatuses),
  note: z.string().trim().optional(),
});

export const serviceFilterSchema = z.object({
  category: z.enum(serviceCategories).optional(),
});

export type SubmitRequestInput = z.infer<typeof submitRequestSchema>;
export type TrackRequestInput = z.infer<typeof trackRequestSchema>;
export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;

const jobImportantDateSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

const optionalUrl = z.string().url().optional().or(z.literal(""));

export const createJobPostSchema = z.object({
  title: z.string().trim().min(4),
  organization: z.string().trim().min(2),
  category: z.enum(jobCategories),
  status: z.enum(jobPostStatuses).default("published"),
  shortInfo: z.string().trim().min(10),
  vacancies: z.coerce.number().int().positive().optional(),
  applicationFee: z.string().trim().optional(),
  eligibility: z.string().trim().min(3),
  ageLimit: z.string().trim().optional(),
  importantDates: z.array(jobImportantDateSchema).default([]),
  applyStartDate: z.string().date().optional(),
  applyEndDate: z.string().date().optional(),
  applyLink: optionalUrl,
  notificationLink: optionalUrl,
  officialWebsite: optionalUrl,
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  isFeatured: z.boolean().default(false),
});

export const updateJobPostSchema = createJobPostSchema.partial();

export const jobPostFilterSchema = z.object({
  category: z.enum(jobCategories).optional(),
  query: z.string().trim().optional(),
});

export type CreateJobPostInput = z.infer<typeof createJobPostSchema>;
export type UpdateJobPostInput = z.infer<typeof updateJobPostSchema>;
export type JobPostFilterInput = z.infer<typeof jobPostFilterSchema>;
