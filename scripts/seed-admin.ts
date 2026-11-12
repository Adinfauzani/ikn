import { hashPassword } from "better-auth/crypto";
import { createClient } from "@libsql/client";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const email = required("ADMIN_EMAIL").toLowerCase();
  const password = required("ADMIN_PASSWORD");
  const name = process.env.ADMIN_NAME ?? "Administrator";

  const client = createClient({
    url: required("DATABASE_URL"),
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  await client.execute("PRAGMA foreign_keys = ON;");

  const existing = await client.execute({
    sql: "SELECT id FROM users WHERE email = ? LIMIT 1",
    args: [email],
  });
  if (existing.rows.length > 0) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const now = Date.now();
  const userId = crypto.randomUUID();
  const accountId = crypto.randomUUID();
  const hashed = await hashPassword(password);

  await client.execute({
    sql: `INSERT INTO users (id, name, email, email_verified, image, created_at, updated_at, role)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [userId, name, email, 1, null, now, now, "admin"],
  });

  await client.execute({
    sql: `INSERT INTO accounts (id, account_id, provider_id, user_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      accountId,
      userId,
      "credential",
      userId,
      null,
      null,
      null,
      null,
      null,
      null,
      hashed,
      now,
      now,
    ],
  });

  console.log(`Created admin user: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
