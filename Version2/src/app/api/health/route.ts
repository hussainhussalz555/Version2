import { getDb, isDatabaseConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return Response.json(
      {
        ok: false,
        configured: false,
        error:
          "DATABASE_URL is not set. Add it in Vercel → Project → Settings → Environment Variables and redeploy.",
      },
      { status: 503 },
    );
  }

  try {
    await getDb().execute(sql`select 1`);
    return Response.json({ ok: true, configured: true });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        configured: true,
        error: error instanceof Error ? error.message : "Unknown database error",
        // Drizzle wraps the driver error, so surface the original cause too.
        cause:
          error instanceof Error && error.cause instanceof Error
            ? error.cause.message
            : undefined,
      },
      { status: 500 },
    );
  }
}
