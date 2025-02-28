import { eq } from "drizzle-orm";
import db from "../db";
import { comments } from "../db/schemas";
import { NewComment, Comment, updatableComment } from "../interfaces/Comment";
import { PaginationParams } from "../interfaces/PaginationParams";

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

  public async getCommentsByVideoId(videoId: string, params: PaginationParams): Promise<Comment[]> {
    try {
      const videoComments = await db
        .select()
        .from(comments)
        .where(eq(comments.videoId, videoId))
        .orderBy(comments.createdAt);
      return videoComments;
    } catch (error) {
      throw error;
    }
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
