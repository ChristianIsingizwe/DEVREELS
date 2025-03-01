import { and, desc, eq, lt, lte, or } from "drizzle-orm";
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
    try {
      const limit = Math.min(params.limit, 30);

      const conditions = params.cursor
        ? and(
            eq(comments.videoId, videoId),
            or(
              lt(comments.createdAt, params.cursor.createdAt),
              and(
                eq(comments.createdAt, params.cursor.createdAt),
                lt(comments.id, params.cursor.id)
              )
            )
          )
        : eq(comments.videoId, videoId);

      const query = db
        .select()
        .from(comments)
        .where(conditions)
        .orderBy(desc(comments.createdAt), desc(comments.id))
        .limit(limit + 1);

      const fetchedComments = await query;
      const hasMore = fetchedComments.length > limit;
      const results = hasMore ? fetchedComments.slice(0, -1) : fetchedComments;

      return {
        items: results,
        nextCursor: hasMore
          ? {
              createdAt: results[results.length - 1].createdAt,
              id: results[results.length - 1].id,
            }
          : null,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getCommentsByUserId(
    userId: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<Comment>> {
    try {
      const limit = Math.min(params.limit, 30);

      const conditions = params.cursor
        ? and(
            eq(comments.userId, userId),
            or(
              lt(comments.createdAt, params.cursor.createdAt),
              and(
                eq(comments.createdAt, params.cursor.createdAt),
                lt(comments.id, params.cursor.id)
              )
            )
          )
        : eq(comments.userId, userId);

      const query = db
        .select()
        .from(comments)
        .where(conditions)
        .orderBy(desc(comments.createdAt), desc(comments.id))
        .limit(limit + 1);

      const fetchedComments = await query;
      const hasMore = fetchedComments.length > limit;
      const results = hasMore ? fetchedComments.slice(0, -1) : fetchedComments;

      return {
        items: results,
        nextCursor: hasMore
          ? {
              createdAt: results[results.length - 1].createdAt,
              id: results[results.length - 1].id,
            }
          : null,
      };
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
