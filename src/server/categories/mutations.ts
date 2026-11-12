import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/db";
import { articles, categories } from "@/src/lib/db/schema";
import { categoryInputSchema } from "@/src/lib/validations";
import { requireAdmin } from "@/src/lib/auth/session";
import { slugify } from "@/src/lib/utils/format";

function normalizeSlug(name: string, slug?: string) {
  const base = slug && slug.trim().length > 0 ? slug : name;
  return slugify(base);
}

export async function createCategory(input: unknown) {
  await requireAdmin();
  const parsed = categoryInputSchema.parse(input);
  const id = crypto.randomUUID();
  const now = new Date();
  await db.insert(categories).values({
    id,
    name: parsed.name,
    slug: normalizeSlug(parsed.name, parsed.slug),
    description: parsed.description ?? null,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/dashboard/categories");
  revalidatePath("/berita");
  return { id };
}

export async function updateCategory(id: string, input: unknown) {
  await requireAdmin();
  const parsed = categoryInputSchema.parse(input);
  const now = new Date();
  await db
    .update(categories)
    .set({
      name: parsed.name,
      slug: normalizeSlug(parsed.name, parsed.slug),
      description: parsed.description ?? null,
      updatedAt: now,
    })
    .where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  revalidatePath("/berita");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const [ref] = await db
    .select({ value: count() })
    .from(articles)
    .where(eq(articles.categoryId, id));
  if ((ref?.value ?? 0) > 0) {
    throw new Error(
      "Kategori tidak dapat dihapus karena masih digunakan oleh artikel. Pindahkan atau ubah artikel terlebih dahulu.",
    );
  }
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  revalidatePath("/berita");
}
