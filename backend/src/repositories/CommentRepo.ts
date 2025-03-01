import { and, eq, lte } from "drizzle-orm";
import db from "../db";
import { comments } from "../db/schemas";
import { NewComment, Comment, updatableComment } from "../interfaces/Comment";
import {
  PaginatedResponse,
  PaginationParams,
} from "../interfaces/PaginationParams";

class CommentRepository {
  public async insertComment(comment: NewComment): Promise<Comment> {
    try {
      const insertedComment = await db
        .insert(comments)
        .values(comment)
        .returning()
        .execute();
      return insertedComment[0];
    } catch (error) {
      throw error;
    }
  }

  public async getCommentsByVideoId(
    videoId: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<Comment>> {
    const limit = Math.min(params.limit, 30);

    const conditions = params.cursor
      ? and(
          eq(comments.videoId, videoId),
          lte(comments.createdAt, params.cursor.createdAt),
          lte(comments.id, params.cursor.id)
        )
      : eq(comments.videoId, videoId);

    const query = db
      .select()
      .from(comments)
      .where(conditions)
      .orderBy(comments.createdAt)
      .limit(limit + 1);

    const items = query;
    const hasMore = (await items).length > limit;

    const results = hasMore ? (await items).slice(0, -1) : await items;

    return {
      items: results,
      nextCursor: hasMore
        ? {
            createdAt: results[results.length - 1].createdAt,
            id: results[results.length - 1].id,
          }
        : null,
    };
  }

  public async getCommentsByUserId(userId: string): Promise<Comment[]> {
    try {
      const userComments = await db
        .select()
        .from(comments)
        .where(eq(comments.userId, userId))
        .orderBy(comments.createdAt);
      return userComments;
    } catch (error) {
      throw error;
    }
  }

  public async getCommentById(id: string): Promise<Comment | undefined> {
    try {
      const comment = await db.query.comments.findFirst({
        where: eq(comments.id, id),
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCommentsByVideo(videoId: string): Promise<Comment[]> {
    try {
      const deletedComments = await db
        .delete(comments)
        .where(eq(comments.videoId, videoId))
        .returning()
        .execute();
      return deletedComments;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCommentsByUser(userId: string): Promise<Comment[]> {
    try {
      const deletedComments = await db
        .delete(comments)
        .where(eq(comments.userId, userId))
        .returning()
        .execute();
      return deletedComments;
    } catch (error) {
      throw error;
    }
  }

  public async deleteComment(id: string): Promise<Comment> {
    try {
      const deletedComment = await db
        .delete(comments)
        .where(eq(comments.id, id))
        .returning()
        .execute();
      return deletedComment[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateComment(
    id: string,
    commentUpdates: updatableComment
  ): Promise<Comment> {
    try {
      const updatedComment = await db
        .update(comments)
        .set(commentUpdates)
        .where(eq(comments.id, id))
        .returning()
        .execute();
      return updatedComment[0];
    } catch (error) {
      throw error;
    }
  }
}

const commentRepository = new CommentRepository();
export default commentRepository;
