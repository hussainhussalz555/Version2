import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export type Database = NodePgDatabase;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: Database;
};

/**
 * True when a connection string is available.
 *
 * Safe to call at build time — it never opens a connection, so pages/routes can
 * decide how to behave when the database is not wired up yet.
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function createPool(connectionString: string): Pool {
  // Managed Postgres providers (Neon, Supabase, Vercel Postgres, ...) require TLS.
  // `sslmode=disable` in the connection string opts out explicitly.
  const useSsl =
    !/sslmode=disable/i.test(connectionString) &&
    process.env.NODE_ENV === "production";

  return new Pool({
    connectionString,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
}

/**
 * Lazily creates (and reuses) the connection pool.
 *
 * The pool is intentionally NOT created at import time: `next build` imports
 * every route while collecting page data, and doing that in an environment
 * without DATABASE_URL (e.g. the first Vercel deployment) would fail the build.
 */
export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required. Add it in Vercel → Project → Settings → Environment Variables (or in your local .env file) and redeploy.",
    );
  }

  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = createPool(connectionString);
  }

  return globalForDb.__arenaNextJsPostgresqlPool;
}

/**
 * Lazily creates (and reuses) the Drizzle client. Prefer this in server code.
 */
export function getDb(): Database {
  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = drizzle(getPool());
  }

  return globalForDb.__arenaNextJsPostgresqlDb;
}

/**
 * Drop-in `db` instance kept for existing `import { db } from "@/db"` call sites.
 * It is a proxy so the pool is only created on the first actual query.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, prop) {
    const instance = getDb() as unknown as Record<string | symbol, unknown>;
    const value = instance[prop];

    return typeof value === "function" ? value.bind(instance) : value;
  },
});
