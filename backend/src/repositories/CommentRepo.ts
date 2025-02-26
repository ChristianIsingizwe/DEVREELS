import db from "../db";
import { NewComment, Comment } from "../interfaces/Comment";

class CommentsRepository {
    public async insertComments( comment: NewComment): Promise<Comment>{
        const savedComments = await db.comments.insert(comment).returning();
        return savedComments[0];
    }
}