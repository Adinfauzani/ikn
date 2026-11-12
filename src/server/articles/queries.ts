import { count, desc, eq } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { articles } from "@/src/lib/db/schema";

export async function getDashboardStats() {
  const [total] = await db.select({ value: count() }).from(articles);
  const [published] = await db
    .select({ value: count() })
    .from(articles)
    .where(eq(articles.status, "PUBLISHED"));
  const [draft] = await db
    .select({ value: count() })
    .from(articles)
    .where(eq(articles.status, "DRAFT"));

  const recent = await db
    .select({
      id: articles.id,
      title: articles.title,
      status: articles.status,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .orderBy(desc(articles.updatedAt))
    .limit(5);

  return {
    total: total?.value ?? 0,
    published: published?.value ?? 0,
    draft: draft?.value ?? 0,
    recent,
  };
}
