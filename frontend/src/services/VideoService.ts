import axiosInstance from "../clients/apiClient";
import { PaginatedResponse, Video } from "../interfaces/VideoInterfaces";

export interface PaginationCursor{
    createdAt: string; 
    id: string;
}

export interface GetVideoParams{
    limit?: number; 
    cursor?: PaginationCursor;
}

class VideoService {
    public async getVideos(params: GetVideoParams): Promise<PaginatedResponse<Video>>{
        const response = await axiosInstance.get('/videos', {
            params: {
                limit: params.limit, 
                cursor: params.cursor ? JSON.stringify(params.cursor) : undefined
            }
        })
        return response.data
    }

    public async getVideoById(id: string): Promise<Video>{
        const response = await axiosInstance.get(`/videos/${id}`)
        return response.data
    }
}

const videoService = new VideoService();
export default videoService;

