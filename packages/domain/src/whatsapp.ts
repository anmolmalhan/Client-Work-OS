import { formatMoney } from "./money";
import type { BusinessProfile, ClientRequest, ServiceItem } from "./types";

export function normalizePhoneForWhatsapp(phone: string, countryCode = "91") {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `${countryCode}${digits}` : digits;
}

export function buildWhatsappLink(phone: string, message: string) {
  return `https://wa.me/${normalizePhoneForWhatsapp(phone)}?text=${encodeURIComponent(message)}`;
}

export function buildServiceRequestMessage(business: BusinessProfile, service: ServiceItem) {
  return [
    `Hello ${business.name},`,
    `I want help with: ${service.name}`,
    `Required documents: ${service.requiredDocuments.join(", ")}`,
    "Please tell me the final price and next steps.",
  ].join("\n");
}

export function buildRequestStatusMessage(business: BusinessProfile, request: ClientRequest) {
  return [
    `Hello ${request.clientName}, update for ${request.requestId}:`,
    `Service: ${request.serviceName}`,
    `Status: ${request.status.replaceAll("_", " ")}`,
    `Payment: ${request.payment.status}`,
    request.payment.balanceAmount > 0 ? `Balance: ${formatMoney(request.payment.balanceAmount)}` : "Balance: cleared",
    `- ${business.name}`,
  ].join("\n");
}

export function buildNewRequestMessage(business: BusinessProfile) {
  return [
    `Hello ${business.name},`,
    "I want to submit a digital work request.",
    "Name:",
    "Service:",
    "Deadline:",
    "I will send documents here.",
  ].join("\n");
}
