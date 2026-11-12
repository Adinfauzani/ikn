import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { articles } from "./articles";

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  storageKey: text("storage_key").notNull(),
  publicUrl: text("public_url").notNull(),
  altText: text("alt_text"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const mediaRelations = relations(media, ({ many }) => ({
  coverArticles: many(articles),
}));
