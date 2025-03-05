
import likesRepository from "../repositories/LikeRepository";

class LikeService {
  public async addLike(videoId: string, userId: string): Promise<void> {
    try {
      await likesRepository.addLike(videoId, userId);
    } catch (error) {
      throw new Error("Could not add like");
    }
  }

  public async removeLike(videoId: string, userId: string): Promise<void> {
    try {
      await likesRepository.removeLike(videoId, userId);
    } catch (error) {
      throw new Error("Could not remove like");
    }
  }
}

export default new LikeService();
