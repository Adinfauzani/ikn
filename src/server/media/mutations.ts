import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/db";
import { articles, media } from "@/src/lib/db/schema";
import { getR2BucketName, getR2Client, getR2PublicUrl } from "@/src/lib/storage/r2";
import { requireAdmin } from "@/src/lib/auth/session";

export async function createMediaRecord(input: {
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  storageKey: string;
  publicUrl: string;
  altText?: string | null;
}) {
  await requireAdmin();
  const id = crypto.randomUUID();
  await db.insert(media).values({
    id,
    fileName: input.fileName,
    originalName: input.originalName,
    mimeType: input.mimeType,
    fileSize: input.fileSize,
    storageKey: input.storageKey,
    publicUrl: input.publicUrl,
    altText: input.altText ?? null,
    createdAt: new Date(),
  });
  revalidatePath("/dashboard/media");
  return { id };
}

export async function uploadMediaFile(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("Berkas tidak valid.");
  if (!file.type.startsWith("image/")) throw new Error("Hanya berkas gambar yang didukung.");

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const key = `media/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  const publicUrl = `${getR2PublicUrl()}/${key}`;
  return createMediaRecord({
    fileName: key.split("/").pop() ?? key,
    originalName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    storageKey: key,
    publicUrl,
  });
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  const [ref] = await db
    .select({ value: count() })
    .from(articles)
    .where(eq(articles.coverImageId, id));
  if ((ref?.value ?? 0) > 0) {
    throw new Error("Media tidak dapat dihapus karena digunakan sebagai sampul artikel.");
  }

  const row = await db.query.media.findFirst({ where: eq(media.id, id) });
  if (!row) throw new Error("Media tidak ditemukan.");

  const client = getR2Client();
  try {
    await client.send(
      new DeleteObjectCommand({ Bucket: getR2BucketName(), Key: row.storageKey }),
    );
  } catch {
    // allow metadata cleanup if object already missing
  }
  await db.delete(media).where(eq(media.id, id));
  revalidatePath("/dashboard/media");
}
