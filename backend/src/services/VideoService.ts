import config from "../config/config";
import ffmpeg from "../config/ffmpegConfig";
import { videoRepository } from "../repositories/videoRepository";
import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
    cloud_name: config.cloudinary.cloudName, 
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
})

class VideoService{
    private processVideo(inputPath: string, resolution: string, outputPath: string): Promise<void>{
        return new Promise((resolve, reject) =>{
            ffmpeg(inputPath)
            .output(outputPath)
            .size(resolution)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run()
        })
    }

    private async uploadToCloudinary(filePath: string): Promise<string>{
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: 'video'
            });
            return result.secure_url;
        } catch (error) {
            throw error;
        }
    }

    
}