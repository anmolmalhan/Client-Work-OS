import { describe, expect, test } from "bun:test";
import { getGuideBySlug, guides } from "./guides";

describe("guides", () => {
  test("every guide has a unique slug", () => {
    const slugs = guides.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("every guide has at least one content section", () => {
    for (const guide of guides) {
      expect(guide.sections.length).toBeGreaterThan(0);
    }
  });

  test("getGuideBySlug returns the matching guide", () => {
    const first = guides[0]!;
    expect(getGuideBySlug(first.slug)?.title).toBe(first.title);
  });

  test("getGuideBySlug returns undefined for an unknown slug", () => {
    expect(getGuideBySlug("does-not-exist")).toBeUndefined();
  });
});
