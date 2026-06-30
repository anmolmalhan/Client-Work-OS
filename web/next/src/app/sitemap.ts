import { getPublishedJobPosts, guides } from "@wdsc/domain";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3100";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/guides", "/pricing", "/submit-request", "/track-request", "/contact", "/faq", "/about", "/privacy", "/refund", "/terms", "/sarkari-result"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "/sarkari-result" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/sarkari-result" ? 0.9 : 0.6,
  }));

  const jobEntries: MetadataRoute.Sitemap = getPublishedJobPosts().map((job) => ({
    url: `${BASE_URL}/sarkari-result/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...guideEntries, ...jobEntries];
}
