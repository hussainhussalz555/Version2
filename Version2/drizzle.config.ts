import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Fallback keeps local `drizzle-kit` commands working before a .env file exists.
const url =
  process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: { url },
});
