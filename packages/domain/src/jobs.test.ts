import { describe, expect, test } from "bun:test";
import { jobPosts, getJobPostBySlug, getJobPostsByCategory, getPublishedJobPosts } from "./jobs";

describe("getPublishedJobPosts", () => {
  test("returns only published posts", () => {
    const published = getPublishedJobPosts();
    expect(published.every((job) => job.status === "published")).toBe(true);
  });

  test("is sorted newest-first by publishedAt", () => {
    const published = getPublishedJobPosts();
    for (let i = 1; i < published.length; i += 1) {
      expect(published[i - 1]!.publishedAt >= published[i]!.publishedAt).toBe(true);
    }
  });

  test("does not mutate the source array order", () => {
    const before = jobPosts.map((job) => job.id);
    getPublishedJobPosts();
    expect(jobPosts.map((job) => job.id)).toEqual(before);
  });
});

describe("getJobPostBySlug", () => {
  test("finds a known seed listing", () => {
    expect(getJobPostBySlug("ssc-cgl-2026-online-form")?.title).toContain("SSC CGL");
  });

  test("returns undefined for an unknown slug", () => {
    expect(getJobPostBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getJobPostsByCategory", () => {
  test("returns only posts in the requested category", () => {
    const results = getJobPostsByCategory("result");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((job) => job.category === "result")).toBe(true);
  });
});
