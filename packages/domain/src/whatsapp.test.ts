import { describe, expect, test } from "bun:test";
import { businessProfile, requests, services } from "./demo";
import { buildNewRequestMessage, buildRequestStatusMessage, buildServiceRequestMessage, buildWhatsappLink, normalizePhoneForWhatsapp } from "./whatsapp";

describe("normalizePhoneForWhatsapp", () => {
  test("prefixes country code for 10-digit numbers", () => {
    expect(normalizePhoneForWhatsapp("9876500001")).toBe("919876500001");
  });

  test("strips non-digits before checking length", () => {
    expect(normalizePhoneForWhatsapp("98765-00001")).toBe("919876500001");
  });

  test("leaves already-prefixed numbers untouched", () => {
    expect(normalizePhoneForWhatsapp("919876500001")).toBe("919876500001");
  });
});

describe("buildWhatsappLink", () => {
  test("builds a wa.me link with url-encoded message", () => {
    const link = buildWhatsappLink("9876500001", "Hello there");
    expect(link).toBe("https://wa.me/919876500001?text=Hello%20there");
  });

  test("encodes newlines and special characters", () => {
    const link = buildWhatsappLink("9876500001", "Line 1\nLine 2 & more");
    expect(link).toContain("Line%201%0ALine%202%20%26%20more");
  });
});

describe("buildServiceRequestMessage", () => {
  test("includes the business name, service name, and required documents", () => {
    const service = services[0]!;
    const message = buildServiceRequestMessage(businessProfile, service);
    expect(message).toContain(businessProfile.name);
    expect(message).toContain(service.name);
    expect(message).toContain(service.requiredDocuments.join(", "));
  });
});

describe("buildNewRequestMessage", () => {
  test("greets the business and lists the prompts to fill", () => {
    const message = buildNewRequestMessage(businessProfile);
    expect(message).toContain(`Hello ${businessProfile.name},`);
    expect(message).toContain("Service:");
    expect(message).toContain("Deadline:");
  });
});

describe("buildRequestStatusMessage", () => {
  test("summarises status and shows the outstanding balance", () => {
    const request = requests[0]!;
    const message = buildRequestStatusMessage(businessProfile, request);
    expect(message).toContain(request.requestId);
    expect(message).toContain(request.status.replaceAll("_", " "));
    const expectedBalance = request.payment.balanceAmount > 0 ? "Balance:" : "Balance: cleared";
    expect(message).toContain(expectedBalance);
  });
});
