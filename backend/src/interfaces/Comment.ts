export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NewComment = Omit<Comment, "id" | "createdAt" | "updatedAt">;
