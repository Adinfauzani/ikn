import { and, desc, eq, ne, sql, type SQL } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { articles, categories, media, user } from "@/src/lib/db/schema";

export type PublicArticleListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: Date | null;
  coverUrl: string | null;
  coverAlt: string | null;
  categoryName: string | null;
  categorySlug: string | null;
};

function publishedConditions(opts?: { q?: string; categorySlug?: string }) {
  const conds: SQL[] = [eq(articles.status, "PUBLISHED")];
  if (opts?.q) {
    const like = `%${opts.q}%`;
    conds.push(sql`(${articles.title} LIKE ${like} OR ${articles.excerpt} LIKE ${like})`);
  }
  if (opts?.categorySlug) {
    conds.push(eq(categories.slug, opts.categorySlug));
  }
  return conds;
}

export async function getPublishedArticles(opts?: {
  limit?: number;
  offset?: number;
  q?: string;
  categorySlug?: string;
}): Promise<PublicArticleListItem[]> {
  const limit = opts?.limit ?? 10;
  const offset = opts?.offset ?? 0;
  const conds = publishedConditions({ q: opts?.q, categorySlug: opts?.categorySlug });

  return db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      publishedAt: articles.publishedAt,
      coverUrl: media.publicUrl,
      coverAlt: media.altText,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(articles)
    .leftJoin(media, eq(articles.coverImageId, media.id))
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(and(...conds))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function countPublishedArticles(opts?: {
  q?: string;
  categorySlug?: string;
}): Promise<number> {
  const conds = publishedConditions({ q: opts?.q, categorySlug: opts?.categorySlug });
  const rows = await db
    .select({ id: articles.id })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(and(...conds));
  return rows.length;
}

export async function getPublishedArticleBySlug(slug: string) {
  const rows = await db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      content: articles.content,
      publishedAt: articles.publishedAt,
      updatedAt: articles.updatedAt,
      seoTitle: articles.seoTitle,
      seoDescription: articles.seoDescription,
      coverUrl: media.publicUrl,
      coverAlt: media.altText,
      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,
      authorName: user.name,
    })
    .from(articles)
    .leftJoin(media, eq(articles.coverImageId, media.id))
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(user, eq(articles.authorId, user.id))
    .where(and(eq(articles.slug, slug), eq(articles.status, "PUBLISHED")))
    .limit(1);
  return rows[0] ?? null;
}

export async function getRelatedArticles(
  categoryId: string | null,
  excludeId: string,
  limit = 3,
) {
  if (!categoryId) return [];
  return db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      publishedAt: articles.publishedAt,
      coverUrl: media.publicUrl,
      coverAlt: media.altText,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(articles)
    .leftJoin(media, eq(articles.coverImageId, media.id))
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(
      and(
        eq(articles.status, "PUBLISHED"),
        eq(articles.categoryId, categoryId),
        ne(articles.id, excludeId),
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getPublishedCategories() {
  const rows = await db
    .selectDistinct({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .innerJoin(articles, eq(articles.categoryId, categories.id))
    .where(eq(articles.status, "PUBLISHED"))
    .orderBy(categories.name);
  return rows;
}
