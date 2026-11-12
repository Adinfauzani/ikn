import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/db";
import { articles } from "@/src/lib/db/schema";
import { articleInputSchema } from "@/src/lib/validations";
import { requireAdmin } from "@/src/lib/auth/session";
import { slugify } from "@/src/lib/utils/format";

function normalizeSlug(title: string, slug?: string) {
  const base = slug && slug.trim().length > 0 ? slug : title;
  return slugify(base);
}

export async function createArticle(input: unknown) {
  const session = await requireAdmin();
  const parsed = articleInputSchema.parse(input);
  const id = crypto.randomUUID();
  const now = new Date();
  const slug = normalizeSlug(parsed.title, parsed.slug);
  const status = parsed.status ?? "DRAFT";
  const publishedAt = status === "PUBLISHED" ? (parsed.publishedAt ?? now) : null;

  await db.insert(articles).values({
    id,
    title: parsed.title,
    slug,
    excerpt: parsed.excerpt ?? null,
    content: parsed.content,
    coverImageId: parsed.coverImageId ?? null,
    authorId: session.user.id,
    categoryId: parsed.categoryId ?? null,
    status,
    seoTitle: parsed.seoTitle ?? null,
    seoDescription: parsed.seoDescription ?? null,
    publishedAt,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath("/dashboard/articles");
  return { id, slug };
}

export async function updateArticle(id: string, input: unknown) {
  await requireAdmin();
  const parsed = articleInputSchema.parse(input);
  const now = new Date();
  const slug = normalizeSlug(parsed.title, parsed.slug);
  const existing = await db.query.articles.findFirst({ where: eq(articles.id, id) });
  if (!existing) throw new Error("Artikel tidak ditemukan.");

  let publishedAt = existing.publishedAt;
  if (parsed.status === "PUBLISHED" && !publishedAt) {
    publishedAt = parsed.publishedAt ?? now;
  }
  if (parsed.status === "DRAFT") {
    publishedAt = null;
  }

  await db
    .update(articles)
    .set({
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt ?? null,
      content: parsed.content,
      coverImageId: parsed.coverImageId ?? null,
      categoryId: parsed.categoryId ?? null,
      status: parsed.status,
      seoTitle: parsed.seoTitle ?? null,
      seoDescription: parsed.seoDescription ?? null,
      publishedAt,
      updatedAt: now,
    })
    .where(eq(articles.id, id));

  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath(`/berita/${slug}`);
  revalidatePath(`/berita/${existing.slug}`);
  revalidatePath("/dashboard/articles");
  revalidatePath(`/dashboard/articles/${id}/edit`);
  return { id, slug };
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const existing = await db.query.articles.findFirst({ where: eq(articles.id, id) });
  if (!existing) throw new Error("Artikel tidak ditemukan.");
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath(`/berita/${existing.slug}`);
  revalidatePath("/dashboard/articles");
}

export async function setArticleStatus(id: string, status: "DRAFT" | "PUBLISHED") {
  await requireAdmin();
  const existing = await db.query.articles.findFirst({ where: eq(articles.id, id) });
  if (!existing) throw new Error("Artikel tidak ditemukan.");
  const now = new Date();
  const publishedAt = status === "PUBLISHED" ? (existing.publishedAt ?? now) : null;
  await db
    .update(articles)
    .set({ status, publishedAt, updatedAt: now })
    .where(and(eq(articles.id, id)));
  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath(`/berita/${existing.slug}`);
  revalidatePath("/dashboard/articles");
}
