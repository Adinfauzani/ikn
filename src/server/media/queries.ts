import { desc } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { media } from "@/src/lib/db/schema";

export async function listMedia() {
  return db.select().from(media).orderBy(desc(media.createdAt));
}
