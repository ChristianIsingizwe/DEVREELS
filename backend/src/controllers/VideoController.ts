import { Request, Response } from "express";
import { videoService } from "../services/VideoService";
import videoFieldsSchema from "../joiSchemas/videoSchema";
import { RequestWithFile } from "../interfaces/RequestWithFile";

class VideoController {
    public async saveVideo(req: RequestWithFile, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No video file provided" });
            }

            const { error, value } = videoFieldsSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const savedVideo = await videoService.saveVideo(
                req.file.path,
                {
                    title: value.title,
                    description: value.description
                }
            );

            res.status(201).json(savedVideo);
        } catch (error) {
            console.error("An error occurred: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async getVideo(req: Request, res: Response){
        try {
            const {id} = req.params
            const video = await videoService.getVideoById(id); 
            if (!video){
                return res.status(404).json({message: "Video not found"})
            }
            res.status(200).json({video})
        } catch (error) {
            res.status(500).json({message: "Internal server error."})
        }
    }

    public async getVideos(req: Request, res: Response){
        try {
            
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}

export const videoController = new VideoController();