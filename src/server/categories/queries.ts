import { asc, eq } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { categories } from "@/src/lib/db/schema";

export async function listCategories() {
  return db.select().from(categories).orderBy(asc(categories.name));
}

export async function getCategoryById(id: string) {
  return db.query.categories.findFirst({ where: eq(categories.id, id) });
}
