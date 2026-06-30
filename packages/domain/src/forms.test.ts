import { describe, expect, test } from "bun:test";
import { createJobPostSchema, submitRequestSchema, trackRequestSchema } from "./forms";

describe("submitRequestSchema", () => {
  const valid = {
    fullName: "Asha Kumari",
    whatsappNumber: "9876500001",
    serviceId: "online-form-filling",
    description: "Please fill my SSC form with photo and signature.",
    consentGiven: true as const,
  };

  test("accepts a valid request and defaults urgency to normal", () => {
    const parsed = submitRequestSchema.parse(valid);
    expect(parsed.urgency).toBe("normal");
  });

  test("rejects when consent is not given", () => {
    expect(submitRequestSchema.safeParse({ ...valid, consentGiven: false }).success).toBe(false);
  });

  test("rejects a too-short description", () => {
    expect(submitRequestSchema.safeParse({ ...valid, description: "hi" }).success).toBe(false);
  });

  test("allows an empty email string", () => {
    expect(submitRequestSchema.safeParse({ ...valid, email: "" }).success).toBe(true);
  });
});

describe("trackRequestSchema", () => {
  test("requires a request id and a 10+ digit whatsapp number", () => {
    expect(trackRequestSchema.safeParse({ requestId: "SDS-2026-0001", whatsappNumber: "9876500001" }).success).toBe(true);
    expect(trackRequestSchema.safeParse({ requestId: "x", whatsappNumber: "123" }).success).toBe(false);
  });
});

describe("createJobPostSchema apply window", () => {
  const base = {
    title: "SSC CGL 2026 Online Form",
    organization: "Staff Selection Commission",
    category: "latest_job" as const,
    shortInfo: "Apply online for SSC CGL 2026 vacancies.",
    eligibility: "Graduate",
  };

  test("accepts a start date on or before the end date", () => {
    expect(createJobPostSchema.safeParse({ ...base, applyStartDate: "2026-07-01", applyEndDate: "2026-07-20" }).success).toBe(true);
  });

  test("rejects a start date after the end date", () => {
    expect(createJobPostSchema.safeParse({ ...base, applyStartDate: "2026-07-25", applyEndDate: "2026-07-20" }).success).toBe(false);
  });

  test("accepts when only one of the dates is provided", () => {
    expect(createJobPostSchema.safeParse({ ...base, applyEndDate: "2026-07-20" }).success).toBe(true);
  });
});
