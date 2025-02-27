import { Request, Response } from "express";
import { videoService } from "../services/VideoService";
import { RequestWithFile } from "../interfaces/RequestWithFile";
import videoFieldsSchema from "../joiSchemas/videoSchema";

class VideoController {
  async uploadVideo(req: RequestWithFile, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Video missing" });
        return 
      }

      const { error, value } = videoFieldsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const video = await videoService.saveVideo(req.file.path, value);
      res.status(201).json(video);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getVideos(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const cursor = req.query.cursor
        ? JSON.parse(req.query.cursor as string)
        : undefined;

      const videos = await videoService.getVideos({ limit, cursor });
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: "Error fetching videos" });
    }
  }

  async getVideo(req: Request, res: Response): Promise<void> {
    try {
      const video = await videoService.getVideoById(req.params.id);
      res.status(200).json(video);
    } catch (error) {
      res.status(404).json({ error: "Video not found" });
    }
  }

  async updateVideo(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = videoFieldsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const video = await videoService.updateVideo(req.params.id, value);
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: "Error updating video" });
    }
  }

  async deleteVideo(req: Request, res: Response): Promise<void> {
    try {
      const video = await videoService.deleteVideo(req.params.id);
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: "Error deleting video" });
    }
  }
}

export const videoController = new VideoController();
