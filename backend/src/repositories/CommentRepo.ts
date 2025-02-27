import db from "../db";
import { comments } from "../db/schemas";
import { NewComment, Comment } from "../interfaces/Comment";

class CommentsRepository {
    public async insertComment(comment: NewComment): Promise<Comment>{
        const newComment = await db.insert(comments).values(comment).returning();
        return newComment[0];
    }
}

const commentRepository = new CommentsRepository(); 
export default commentRepository;