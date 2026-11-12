import { eq } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { siteSettings } from "@/src/lib/db/schema";

export async function getAllSettings() {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string | null>;
}

export async function getSetting(key: string) {
  const row = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  return row?.value ?? null;
}
