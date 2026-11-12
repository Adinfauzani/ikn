import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL ?? "file:./.data/local.db";

export const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

try {
  await client.execute("PRAGMA foreign_keys = ON;");
} catch {
  // Best-effort; foreign key enforcement may depend on driver/runtime support.
}
