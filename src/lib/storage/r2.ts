import { S3Client } from "@aws-sdk/client-s3";
import { getRequiredEnv } from "@/src/lib/utils/env";

export function getR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${getRequiredEnv("CLOUDFLARE_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: getRequiredEnv("CLOUDFLARE_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredEnv("CLOUDFLARE_SECRET_ACCESS_KEY"),
    },
  });
}

export function getR2BucketName() {
  return getRequiredEnv("CLOUDFLARE_BUCKET_NAME");
}

export function getR2PublicUrl() {
  return getRequiredEnv("CLOUDFLARE_PUBLIC_URL").replace(/\/$/, "");
}
