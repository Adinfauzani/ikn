import { desc, eq } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { articles, categories, user } from "@/src/lib/db/schema";

export async function listArticlesAdmin() {
  return db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      status: articles.status,
      updatedAt: articles.updatedAt,
      publishedAt: articles.publishedAt,
      categoryName: categories.name,
      authorName: user.name,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(user, eq(articles.authorId, user.id))
    .orderBy(desc(articles.updatedAt));
}

export async function getArticleById(id: string) {
  return db.query.articles.findFirst({
    where: eq(articles.id, id),
  });
}
