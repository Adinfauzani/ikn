import type { MetadataRoute } from "next";
import { db } from "@/src/lib/db";
import { articles } from "@/src/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getAppUrl } from "@/src/lib/utils/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getAppUrl().replace(/\/$/, "");
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tentang`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/berita`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/kontak`, changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const published = await db
      .select({ slug: articles.slug, updatedAt: articles.updatedAt, publishedAt: articles.publishedAt })
      .from(articles)
      .where(eq(articles.status, "PUBLISHED"))
      .orderBy(desc(articles.publishedAt));

    const articleRoutes: MetadataRoute.Sitemap = published.map((a) => ({
      url: `${base}/berita/${a.slug}`,
      lastModified: a.updatedAt ?? a.publishedAt ?? undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch {
    return staticRoutes;
  }
}
