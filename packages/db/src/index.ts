import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbEnv } from "@wdsc/env/db";
import * as schema from "./schema";

const client = postgres(dbEnv.POSTGRES_URL);

export const db = drizzle(client, { schema });
export { schema };
