export interface PaginationParams{
    limit: number;
    cursor?:{
        createdAt: Date;
        id: string;
    }
}


export interface PaginatedResponse<T>{
    items: T[];
    nextCursor?:{
        createdAt: Date;
        id: string;
    } | null;
}