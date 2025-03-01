import { and, eq, sql } from "drizzle-orm";
import db from "../db";
import { likes, videos } from "../db/schemas";

class LikeRepository {
  public async addLike(videoId: string, userId: string): Promise<void> {
    try {
      await db.transaction(async (tx) => {
        const existingLike = await tx.query.likes.findFirst({
          where: and(eq(likes.videoId, videoId), eq(likes.userId, userId)),
        });

        if (existingLike) return;

        await tx.insert(likes).values({ videoId, userId }).execute();

        await tx
          .update(videos)
          .set({ likesCount: sql`${videos.likesCount}  + 1` })
          .where(eq(videos.id, videoId))
          .execute();
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeLike(videoId: string, userId: string): Promise<void> {
    try {
      await db.transaction(async (tx) => {
        const existingLike = await tx.query.likes.findFirst({
          where: and(eq(likes.videoId, videoId), eq(likes.userId, userId)),
        });

        if (!existingLike) return;

        await tx
          .delete(likes)
          .where(and(eq(likes.videoId, videoId), eq(likes.userId, userId)))
          .execute();

        await tx
          .update(videos)
          .set({
            likesCount: sql`${videos.likesCount} - 1`,
          })
          .where(eq(videos.id, videoId))
          .execute();
      });
    } catch (error) {
      throw error;
    }
  }
}

const likesRepository = new LikeRepository();
export default likesRepository;
