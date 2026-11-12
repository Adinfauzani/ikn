import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { categories } from "./categories";
import { media } from "./media";

export const articleStatusValues = ["DRAFT", "PUBLISHED"] as const;
export type ArticleStatus = (typeof articleStatusValues)[number];

export const articles = sqliteTable(
  "articles",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImageId: text("cover_image_id").references(() => media.id, {
      onDelete: "set null",
    }),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    categoryId: text("category_id").references(() => categories.id, {
      onDelete: "restrict",
    }),
    status: text("status", { enum: articleStatusValues })
      .notNull()
      .default("DRAFT"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("articles_status_idx").on(table.status),
    index("articles_slug_idx").on(table.slug),
    index("articles_published_at_idx").on(table.publishedAt),
    index("articles_author_id_idx").on(table.authorId),
    index("articles_category_id_idx").on(table.categoryId),
  ],
);

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(user, {
    fields: [articles.authorId],
    references: [user.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  coverImage: one(media, {
    fields: [articles.coverImageId],
    references: [media.id],
  }),
}));
