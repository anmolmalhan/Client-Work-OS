import { describe, expect, test } from "bun:test";
import { buildWhatsappLink, normalizePhoneForWhatsapp } from "./whatsapp";

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
});
