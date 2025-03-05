// src/controllers/like.controller.ts
import { Request, Response, NextFunction } from "express";
import likeService from "../services/LikeService";

class LikeController {
  public async addLike(req: Request, res: Response, next: NextFunction) {
    try {
      // videoId is expected to be provided as a URL parameter.
      const { videoId } = req.params;
      // Assume req.user is set by an authentication middleware; otherwise fallback to req.body.
      const userId = req.user?.id || req.body.userId;

      if (!videoId || !userId) {
        return res.status(400).json({ message: "Missing videoId or userId" });
      }

      await likeService.addLike(videoId, userId);
      return res.status(201).json({ message: "Like added successfully" });
    } catch (error) {
      console.error("Error adding like:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async removeLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
      const userId = req.user?.id || req.body.userId;

      if (!videoId || !userId) {
        return res.status(400).json({ message: "Missing videoId or userId" });
      }

      await likeService.removeLike(videoId, userId);
      return res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
      console.error("Error removing like:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new LikeController();
