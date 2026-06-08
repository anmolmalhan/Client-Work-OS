import { z } from "zod";
import { requestStatuses, serviceCategories, urgencyLevels } from "./constants";

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
