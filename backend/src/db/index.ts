import { Pool } from "pg";
import config from "../config/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { comments, likes, users, videos } from "./schemas";


const pool = new Pool({
  connectionString: config.databaseUrl,
});

type mySchema = {
  users: typeof users; 
  videos: typeof videos;
  comments: typeof comments; 
  likes: typeof likes; 
}

const db = drizzle<mySchema>(pool, {
  schema: {
    users,
    videos,
    comments,
    likes,
  },
});

export default db; 