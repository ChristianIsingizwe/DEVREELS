import { eq } from 'drizzle-orm';
import {db} from '../db'
import { videos } from '../db/schemas'
import { NewVideo } from '../interfaces/NewVideo'


class VideoRepository {
    async insertVideo(video: NewVideo){
        const newVideo = await db.insert(videos).values(video).returning()
        return newVideo[0];
    }

    async getVideoById(id:string){
        const video = await db.query.videos.findFirst({
            where: eq(videos.id, id)
        })
        return video;
    }
}