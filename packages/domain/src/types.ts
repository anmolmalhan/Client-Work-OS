import type { paymentStatuses, priceTypes, requestStatuses, serviceCategories, urgencyLevels } from "./constants";

export type RequestStatus = (typeof requestStatuses)[number];
export type PaymentStatus = (typeof paymentStatuses)[number];
export type ServiceCategory = (typeof serviceCategories)[number];
export type PriceType = (typeof priceTypes)[number];
export type UrgencyLevel = (typeof urgencyLevels)[number];

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
