import {
  buildNewRequestMessage,
  buildServiceRequestMessage,
  buildWhatsappLink,
  buildRequestStatusMessage,
} from "./whatsapp";
import { getBalanceAmount, getPaymentStatus } from "./money";
import type { BusinessProfile, ClientRequest, DashboardStats, FaqItem, PricingCategory, ServiceItem } from "./types";

export const businessProfile: BusinessProfile = {
  name: "Swift Digital Seva",
  phone: "+91 98765 01234",
  whatsappNumber: "919876501234",
  email: "support@swiftdigitalseva.in",
  workingHours: "Mon-Sat, 9:00 AM - 8:00 PM",
  serviceArea: "Remote service available across India",
};

export const services: ServiceItem[] = [
  {
    id: "online-form-filling",
    name: "Online form filling",
    category: "forms",
    description: "We fill online forms using documents shared by the client and confirm details before submission.",
    priceType: "starting_at",
    estimatedPrice: 149,
    requiredDocuments: ["ID proof", "Photo", "Signature", "Form-specific documents"],
  },
  {
    id: "application-submission",
    name: "Application submission",
    category: "forms",
    description: "Complete application submission support with document upload and confirmation screenshot.",
    priceType: "variable",
    priceNote: "Price depends on portal and form length",
    requiredDocuments: ["Login details if needed", "ID proof", "Required certificates"],
  },
  {
    id: "document-upload",
    name: "Document upload",
    category: "documents",
    description: "Upload documents to online portals after checking size, type, and clarity.",
    priceType: "starting_at",
    estimatedPrice: 99,
    requiredDocuments: ["Portal link", "Login details", "Documents to upload"],
  },
  {
    id: "pdf-merge",
    name: "PDF merge",
    category: "conversion",
    description: "Merge multiple PDFs into one organized file.",
    priceType: "fixed",
    estimatedPrice: 49,
    requiredDocuments: ["PDF files"],
  },
  {
    id: "pdf-compression",
    name: "PDF compression",
    category: "conversion",
    description: "Compress PDF files for upload limits while keeping readable quality.",
    priceType: "fixed",
    estimatedPrice: 49,
    requiredDocuments: ["PDF file", "Target size if any"],
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF conversion",
    category: "conversion",
    description: "Convert JPG/PNG images into a clean PDF.",
    priceType: "fixed",
    estimatedPrice: 49,
    requiredDocuments: ["Images"],
  },
  {
    id: "pdf-to-image",
    name: "PDF to image conversion",
    category: "conversion",
    description: "Convert PDF pages into image files.",
    priceType: "fixed",
    estimatedPrice: 59,
    requiredDocuments: ["PDF file"],
  },
  {
    id: "photo-signature-resize",
    name: "Photo and signature resizing",
    category: "documents",
    description: "Resize photos and signatures as per application portal requirements.",
    priceType: "starting_at",
    estimatedPrice: 79,
    requiredDocuments: ["Photo", "Signature", "Size instructions"],
  },
  {
    id: "file-format-conversion",
    name: "File format conversion",
    category: "conversion",
    description: "Convert supported files into required upload formats.",
    priceType: "variable",
    priceNote: "Price depends on file type",
    requiredDocuments: ["Original file", "Required output format"],
  },
  {
    id: "admit-card-download",
    name: "Admit card download",
    category: "status_support",
    description: "Download admit cards using registration details and share PDF confirmation.",
    priceType: "starting_at",
    estimatedPrice: 99,
    requiredDocuments: ["Registration number", "DOB/password", "Portal name"],
  },
  {
    id: "result-checking",
    name: "Result checking",
    category: "status_support",
    description: "Check result status and share screenshot/PDF.",
    priceType: "starting_at",
    estimatedPrice: 79,
    requiredDocuments: ["Roll number", "DOB/password if required"],
  },
  {
    id: "application-status-checking",
    name: "Application status checking",
    category: "status_support",
    description: "Check application status and explain the next step.",
    priceType: "starting_at",
    estimatedPrice: 99,
    requiredDocuments: ["Application number", "Registered mobile/email if needed"],
  },
  {
    id: "account-login-support",
    name: "Account creation and login support",
    category: "account_support",
    description: "Create accounts or help recover/login where client has valid details.",
    priceType: "variable",
    priceNote: "Price depends on account and verification steps",
    requiredDocuments: ["Mobile/email access", "ID details if required"],
  },
  {
    id: "digital-document-support",
    name: "Digital document support",
    category: "documents",
    description: "General digital document formatting, checking, and upload preparation.",
    priceType: "variable",
    priceNote: "Price depends on work",
    requiredDocuments: ["Document files", "Required instructions"],
  },
];

export const pricing: PricingCategory[] = [
  {
    title: "Fixed-price services",
    description: "Small file work with clear output.",
    items: [
      { label: "PDF merge", price: "Rs 49" },
      { label: "PDF compression", price: "Rs 49" },
      { label: "Image to PDF", price: "Rs 49" },
      { label: "PDF to image", price: "Rs 59" },
    ],
  },
  {
    title: "Starting-price services",
    description: "Common digital work where final price depends on document count.",
    items: [
      { label: "Online form filling", price: "From Rs 149" },
      { label: "Document upload", price: "From Rs 99" },
      { label: "Admit card download", price: "From Rs 99" },
      { label: "Photo/signature resize", price: "From Rs 79" },
    ],
  },
  {
    title: "Variable-price services",
    description: "Work is quoted after checking documents and portal steps.",
    items: [
      { label: "Application submission", price: "After checking" },
      { label: "Account support", price: "After checking" },
      { label: "Urgent work", price: "Extra Rs 50-200" },
      { label: "Complex file conversion", price: "After checking" },
    ],
  },
];

function payment(totalAmount: number, paidAmount: number) {
  const balanceAmount = getBalanceAmount(totalAmount, paidAmount);
  return {
    totalAmount,
    paidAmount,
    balanceAmount,
    status: getPaymentStatus(totalAmount, paidAmount),
  };
}

export const requests: ClientRequest[] = [
  {
    id: "req-1",
    requestId: "SDS-2026-0001",
    clientName: "Rahul Sharma",
    whatsappNumber: "9876500001",
    email: "rahul@example.com",
    serviceId: "online-form-filling",
    serviceName: "Online form filling",
    description: "HSSC form filling with photo and signature upload.",
    deadline: "2026-06-09",
    urgency: "urgent",
    status: "in_progress",
    payment: payment(199, 100),
    documents: [
      { id: "doc-1", name: "Aadhaar.pdf", type: "pdf", isSensitive: true, status: "received" },
      { id: "doc-2", name: "Signature.jpg", type: "image", isSensitive: true, status: "needs_review" },
    ],
    adminNotes: ["Confirm caste certificate before final submit."],
    latestUpdate: "Form details are being verified.",
    createdAt: "2026-06-08T05:30:00.000Z",
    updatedAt: "2026-06-08T06:20:00.000Z",
  },
  {
    id: "req-2",
    requestId: "SDS-2026-0002",
    clientName: "Pooja Malik",
    whatsappNumber: "9812300002",
    serviceId: "pdf-compression",
    serviceName: "PDF compression",
    description: "Compress scholarship documents below 500 KB.",
    deadline: "2026-06-08",
    urgency: "normal",
    status: "completed",
    payment: payment(49, 49),
    documents: [{ id: "doc-3", name: "ScholarshipDocs.pdf", type: "pdf", isSensitive: true, status: "received" }],
    adminNotes: ["Compressed file shared on WhatsApp."],
    finalOutputFile: "ScholarshipDocs-compressed.pdf",
    deliveryConfirmation: "Delivered on WhatsApp",
    latestUpdate: "Completed file delivered.",
    createdAt: "2026-06-08T03:10:00.000Z",
    updatedAt: "2026-06-08T04:00:00.000Z",
  },
  {
    id: "req-3",
    requestId: "SDS-2026-0003",
    clientName: "Amit Kumar",
    whatsappNumber: "9991100003",
    serviceId: "application-status-checking",
    serviceName: "Application status checking",
    description: "Check scholarship application status and share screenshot.",
    deadline: "2026-06-10",
    urgency: "normal",
    status: "payment_pending",
    payment: payment(99, 0),
    documents: [{ id: "doc-4", name: "ApplicationNumber.txt", type: "other", isSensitive: false, status: "received" }],
    adminNotes: ["Waiting for UPI payment."],
    latestUpdate: "Price confirmed. Payment pending.",
    createdAt: "2026-06-08T07:00:00.000Z",
    updatedAt: "2026-06-08T07:20:00.000Z",
  },
  {
    id: "req-4",
    requestId: "SDS-2026-0004",
    clientName: "Sunita Devi",
    whatsappNumber: "9896100004",
    serviceId: "photo-signature-resize",
    serviceName: "Photo and signature resizing",
    description: "Resize photo and signature for online admission form.",
    deadline: "2026-06-09",
    urgency: "normal",
    status: "details_pending",
    payment: payment(79, 0),
    documents: [
      { id: "doc-5", name: "Photo.jpg", type: "image", isSensitive: true, status: "received" },
      { id: "doc-6", name: "Signature", type: "image", isSensitive: true, status: "missing" },
    ],
    adminNotes: ["Signature image still pending."],
    latestUpdate: "Signature image is required.",
    createdAt: "2026-06-08T08:10:00.000Z",
    updatedAt: "2026-06-08T08:15:00.000Z",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How do I send documents?",
    answer: "You can upload documents through the request form or send PDF/images directly on WhatsApp after clicking the request button.",
  },
  {
    question: "Is my data safe?",
    answer: "Documents are used only for your requested work. Sensitive documents are marked in the admin system and future storage will use private links.",
  },
  {
    question: "Do I need to visit physically?",
    answer: "No. This service is remote-first. You can send documents, pay, and receive confirmation through WhatsApp.",
  },
  {
    question: "How do I pay?",
    answer: "The final price is confirmed after checking documents. Payment can be made through UPI or another confirmed method.",
  },
  {
    question: "How long does the work take?",
    answer: "Small PDF and resize work can be completed quickly. Form filling and applications depend on portal steps and document readiness.",
  },
  {
    question: "Can urgent work be done?",
    answer: "Yes, urgent work is accepted when slots are available. Urgent charges may apply.",
  },
  {
    question: "Will I get confirmation after submission?",
    answer: "Yes. Confirmation screenshots, receipt text, or completed files are shared on WhatsApp where applicable.",
  },
];

export const excludedServices = ["Printing", "Lamination", "Photocopying", "Public PC usage"];

export function getDashboardStats(items = requests): DashboardStats {
  return {
    totalRequests: items.length,
    pendingRequests: items.filter((item) => ["request_received", "details_pending", "payment_pending"].includes(item.status)).length,
    paymentPending: items.filter((item) => item.payment.status !== "paid").length,
    inProgress: items.filter((item) => item.status === "in_progress").length,
    completed: items.filter((item) => item.status === "completed").length,
    delivered: items.filter((item) => item.status === "delivered").length,
    revenueCollected: items.reduce((total, item) => total + item.payment.paidAmount, 0),
    balancePending: items.reduce((total, item) => total + item.payment.balanceAmount, 0),
  };
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export function getRequestByRequestId(requestId: string) {
  return requests.find((request) => request.requestId === requestId);
}

export function trackRequest(requestId: string, whatsappNumber: string) {
  const digits = whatsappNumber.replace(/\D/g, "");
  return requests.find((request) => request.requestId.toLowerCase() === requestId.toLowerCase() && request.whatsappNumber.endsWith(digits.slice(-10)));
}

export function getBusinessWhatsappLink(message = buildNewRequestMessage(businessProfile)) {
  return buildWhatsappLink(businessProfile.whatsappNumber, message);
}

export function getServiceWhatsappLink(service: ServiceItem) {
  return buildWhatsappLink(businessProfile.whatsappNumber, buildServiceRequestMessage(businessProfile, service));
}

export function getRequestWhatsappLink(request: ClientRequest) {
  return buildWhatsappLink(request.whatsappNumber, buildRequestStatusMessage(businessProfile, request));
}
