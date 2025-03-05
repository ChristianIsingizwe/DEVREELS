import commentRepository from "../repositories/CommentRepo";
import { NewComment, Comment, updatableComment } from "../interfaces/Comment";
import { PaginatedResponse, PaginationParams } from "../interfaces/PaginationParams";

class CommentService {
  public async createComment(comment: NewComment): Promise<Comment> {
    try {
      return await commentRepository.insertComment(comment);
    } catch (error) {
      // You might want to log the error here.
      throw new Error("Error creating comment");
    }
  }

  public async getCommentsByVideoId(
    videoId: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<Comment>> {
    try {
      return await commentRepository.getCommentsByVideoId(videoId, params);
    } catch (error) {
      throw new Error("Error fetching comments for video");
    }
  }

  public async getCommentsByUserId(
    userId: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<Comment>> {
    try {
      return await commentRepository.getCommentsByUserId(userId, params);
    } catch (error) {
      throw new Error("Error fetching comments for user");
    }
  }

  public async getCommentById(id: string): Promise<Comment | undefined> {
    try {
      return await commentRepository.getCommentById(id);
    } catch (error) {
      throw new Error("Error fetching comment");
    }
  }

  public async updateComment(
    id: string,
    commentUpdates: updatableComment
  ): Promise<Comment> {
    try {
      return await commentRepository.updateComment(id, commentUpdates);
    } catch (error) {
      throw new Error("Error updating comment");
    }
  }

  public async deleteComment(id: string): Promise<Comment> {
    try {
      return await commentRepository.deleteComment(id);
    } catch (error) {
      throw new Error("Error deleting comment");
    }
  }

  public async deleteCommentsByVideo(videoId: string): Promise<Comment[]> {
    try {
      return await commentRepository.deleteCommentsByVideo(videoId);
    } catch (error) {
      throw new Error("Error deleting comments for video");
    }
  }

  public async deleteCommentsByUser(userId: string): Promise<Comment[]> {
    try {
      return await commentRepository.deleteCommentsByUser(userId);
    } catch (error) {
      throw new Error("Error deleting comments for user");
    }
  }
}

export default new CommentService();
