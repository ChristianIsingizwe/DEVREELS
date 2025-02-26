import { eq, and, desc, lte, } from 'drizzle-orm';
import db from '../db';
import { videos } from '../db/schemas'
import { PaginatedResponse, PaginationParams } from '../interfaces/PaginationParams';
import { Video, NewVideo } from '../interfaces/Video';


class VideoRepository {
    async insertVideo(video: NewVideo): Promise<Video>{
        const newVideo = await db.insert(videos).values(video).returning()
        return newVideo[0];
    }

    async getVideoById(id:string): Promise<Video | undefined>{
        const video = await db.query.videos.findFirst({
            where: eq(videos.id, id)
        })
        return video;
    }

    async getVideos(params: PaginationParams): Promise<PaginatedResponse<Video>>{
        const limit = Math.min(params.limit, 30); 
        
        const baseQuery = db.select()
            .from(videos)
            .orderBy(desc(videos.createdAt));

        const query = params.cursor 
            ? baseQuery.where(and(
                lte(videos.createdAt, params.cursor.createdAt),
                lte(videos.id, params.cursor.id)
              ))
            : baseQuery;

        const items = await query.limit(limit + 1);

        const hasMore = items.length > limit;
        const results = hasMore ? items.slice(0, -1) : items;

        return {
            items: results,
            nextCursor: hasMore ? {
                createdAt: results[results.length - 1].createdAt,
                id: results[results.length - 1].id,
            } : null
        };
    }

    async deleteVideo(id: string): Promise<Video>{
        const deletedVideo = await db.delete(videos).where(eq(videos.id, id)).returning(); 
        return deletedVideo[0]
    }


    async updateVideo(id: string, video: Partial<NewVideo>): Promise<Video>{
        const updatedVideo = await db.update(videos).set(video).where(eq(videos.id, id)).returning();
        return updatedVideo[0];
    }
}

export const videoRepository = new VideoRepository();