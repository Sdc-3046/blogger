import { BlogCommentEntity } from "src/entities/blog.comment.entity";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(BlogCommentEntity)
export class BlogCommentRepository extends Repository<BlogCommentRepository> {
  async addComment(id: number, userComment: string, user: UserEntity) {
    const comment = new BlogCommentEntity();
    comment.userComment = userComment;
    comment.blogId = id;
    if (user) {
      comment.userName = user.firstName + ' ' + user.lastName;
    }
    await comment.save();
    return comment;
  }

  async getComments(id: number) {
    const query = this.createQueryBuilder('comments');
    
    try {
        query.andWhere('comments.blogId=:id', { id: id });

        const comments =await query.getMany();

        if (comments) {
        return comments;
        }
    } catch (error) {
        return null;
    }
  }

  async deleteComment(id: number) {
    const query = this.createQueryBuilder('comments');

    try{
        query.andWhere('comments.id=:id', { id: id });

        const comments = await query.getOneOrFail()
        if (comments) {
        await this.remove(comments);
        return "Successfully deleted the comment"
        }
        else{
            return "There is some problem in deleting the comment"
        }
    }
    catch{
        return "Wrong comment id provided"
    }
  }
}
