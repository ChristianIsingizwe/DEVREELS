export interface Video {
    id: string; 
    title: string;
    description: string; 
    cloudinary720Url: string; 
    cloudinary1080Url: string; 
    createdAt: string; 
    updatedAt: string; 
}

export interface PaginatedResponse<T>{
    items: T[]; 
    nextCursor: {
        createdAt: string, 
        id: string 
    } | null; 
}