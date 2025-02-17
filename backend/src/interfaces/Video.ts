export interface Video{
    id: string;
    description: string;
    title: string;
    cloudinary480url: string;
    cloudinary720url: string;
    cloudinary1080url: string;
    createdAt: Date;
    updateAt: Date;
}
