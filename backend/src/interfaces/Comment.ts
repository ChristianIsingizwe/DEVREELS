export interface Comment {
  id: string;
  content: string;
  userId: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NewComment = Omit<Comment, "id" | "createdAt" | "updatedAt">;
export type updatableComment = Omit<Comment, "id" | "createdAt" | "updatedAt" | "userId" | "videoId" >; 
