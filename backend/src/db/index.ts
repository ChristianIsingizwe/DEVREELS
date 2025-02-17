import { Pool } from "pg";
import config from "../config/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { comments, likes, users, videos } from "./schemas";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export const db = drizzle(pool, {
  schema: {
    users,
    videos,
    comments,
    likes,
  },
});
