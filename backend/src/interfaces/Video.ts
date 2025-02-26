export interface Video{
    id: string;
    description: string;
    title: string;
    cloudinary720url: string;
    cloudinary1080url: string;
    createdAt: Date;
    updatedAt: Date;
}

export type NewVideo = Omit<Video, 'id' | 'createdAt' | 'updateAt'>