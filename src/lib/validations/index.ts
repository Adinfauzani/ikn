import { z } from "zod";

export const articleStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const articleInputSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1),
  coverImageId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  status: articleStatusSchema.default("DRAFT"),
  seoTitle: z.string().max(200).optional().nullable(),
  seoDescription: z.string().max(300).optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const categoryInputSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().min(1).max(120),
  description: z.string().max(500).optional().nullable(),
});

export const settingInputSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
