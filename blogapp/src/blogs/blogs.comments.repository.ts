import { BlogCommentEntity } from "src/entities/blog.comment.entity";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(BlogCommentEntity)
export class BlogCommentRepository extends Repository<BlogCommentRepository> {
  async addComment(id: string, userComment: string, user: UserEntity) {
    const comment = new BlogCommentEntity();
    comment.userComment = userComment;
    comment.blogId = id;
    if (user) {
      comment.userName = user.firstName + ' ' + user.lastName;
    }
    const result=await comment.save();
    return result;
  }

  async getComments(id: string) {
    const query = this.createQueryBuilder('comments');
    
    try {
        query.andWhere('comments.blogId=:id', { id: id });

        const comments =await query.getMany();

        if (comments) {
          return comments;
        }
    } catch (error) {
        throw error;
    }
  }

  async deleteComment(id: string) {
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
        throw "Wrong comment id provided"
    }
  }
}
