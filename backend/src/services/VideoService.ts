import config from "../config/config";
import ffmpeg from "../config/ffmpegConfig";
import { NewVideo, Video } from "../interfaces/Video";
import { videoRepository } from "../repositories/videoRepository";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { promises as fs } from "fs";
import {
  PaginatedResponse,
  PaginationParams,
} from "../interfaces/PaginationParams";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

class VideoService {
  private processVideo(
    inputPath: string,
    resolution: string,
    outputPath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(outputPath)
        .size(resolution)
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run();
    });
  }

  private async uploadToCloudinary(filePath: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
      });
      return result.secure_url;
    } catch (error) {
      throw error;
    }
  }

  public async saveVideo(
    originalFilePath: string,
    metadata: { title: string; description: string }
  ): Promise<NewVideo> {
    const dir = path.dirname(originalFilePath);
    const baseName = path.basename(originalFilePath);
    const output720 = path.join(dir, `720p_${baseName}`);
    const output1080 = path.join(dir, `1080p_${baseName}`);

    try {
      await Promise.all([
        this.processVideo(originalFilePath, "720x?", output720),
        this.processVideo(originalFilePath, "1080x?", output1080),
      ]);

      const [url720, url1080] = await Promise.all([
        this.uploadToCloudinary(output720),
        this.uploadToCloudinary(output1080),
      ]);

      const newVideo: NewVideo = {
        title: metadata.title,
        description: metadata.description,
        cloudinary720url: url720,
        cloudinary1080url: url1080,
      };

      const insertedVideo = await videoRepository.insertVideo(newVideo);
      return insertedVideo;
    } catch (error) {
      throw error;
    } finally {
      try {
        await Promise.all([fs.unlink(output720), fs.unlink(output1080)]);
      } catch (cleanUpError) {
        console.error("Error cleaning up temporary files", cleanUpError);
      }
    }
  }

  public async getVideos(
    params: PaginationParams
  ): Promise<PaginatedResponse<Video>> {
    try {
      if (!params.limit || params.limit < 1) {
        params.limit = 10;
      }

      params.limit = Math.min(params.limit, 30);

      if (params.cursor) {
        if (!params.cursor.createdAt || !params.cursor.id) {
          throw new Error("Invalid cursor format");
        }

        if (
          !(params.cursor.createdAt instanceof Date) &&
          isNaN(new Date(params.cursor.createdAt).getTime())
        ) {
          throw new Error("Invalid cursor date format");
        }

        if (typeof params.cursor.createdAt === "string") {
          params.cursor.createdAt = new Date(params.cursor.createdAt);
        }
      }

      const videos = await videoRepository.getVideos(params);

      if (!videos.items) {
        return {
          items: [],
          nextCursor: null,
        };
      }

      return videos;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching videos: ${error.message}`);
      }
      throw new Error("An unexpected error occurred while fetching videos");
    }
  }

  public async getVideoById(id: string): Promise<Video> {
    try {
      const video = await videoRepository.getVideoById(id);
      if (!video) throw new Error("Video not found");
      return video;
    } catch (error) {
      throw error;
    }
  }

  public async deleteVideo(id: string): Promise<Video> {
    try {
      const deletedVideo = await videoRepository.deleteVideo(id);
      return deletedVideo;
    } catch (error) {
      throw error;
    }
  }

  public async updateVideo(id: string, videoUpdates: Partial<NewVideo>) {
    try {
      const updatedVideo = await videoRepository.updateVideo(id, videoUpdates);
      return updatedVideo;
    } catch (error) {
      throw error;
    }
  }
}

export const videoService = new VideoService();
