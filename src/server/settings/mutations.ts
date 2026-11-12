import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/db";
import { siteSettings } from "@/src/lib/db/schema";
import { requireAdmin } from "@/src/lib/auth/session";

export async function upsertSetting(key: string, value: string | null) {
  await requireAdmin();
  const existing = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  const now = new Date();
  if (existing) {
    await db
      .update(siteSettings)
      .set({ value, updatedAt: now })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({
      id: crypto.randomUUID(),
      key,
      value,
      updatedAt: now,
    });
  }
  revalidatePath("/");
  revalidatePath("/kontak");
  revalidatePath("/tentang");
}
