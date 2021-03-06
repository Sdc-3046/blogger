import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogTemplateDto } from '../blogs/dto/blog.template.dto';
import { UserEntity } from '../entities/user.entity';
import { BlogFilter } from './blog.filter';
import { BlogRepository } from './blog.repository';
import { BlogCommentRepository } from './blogs.comments.repository';

@Injectable()
export class BlogService {

    constructor(private blogRepository:BlogRepository, @InjectRepository(BlogCommentRepository) private blogCommentRepository: BlogCommentRepository) {}

    async getBlogs(args:BlogFilter){
        return this.blogRepository.getBlogList(args);
    }

    createBlog(user:UserEntity, blogTemplateDto:BlogTemplateDto ) {
        return this.blogRepository.createBlog(user,blogTemplateDto);
    }

    async getBlogById(id:string){
        return this.blogRepository.getBlogById(id);
    }

    async deleteBlogById(id:string,user:UserEntity){
        return this.blogRepository.deleteBlogById(id,user);
    }

    async updateBlogById(blogTemplateDto:BlogTemplateDto,user:UserEntity)
    {
        return this.blogRepository.updateBlogById(blogTemplateDto,user)
    }

    async createOrupdateBlog(user:UserEntity,blogTemplateDto:BlogTemplateDto){
        return this.blogRepository.createOrupdateBlog(user,blogTemplateDto);
    }

    async addComment(id: string, userComment: string, user: UserEntity) {
        return this.blogCommentRepository.addComment(id, userComment, user);
    }

    async getComments(id: string) {
        return this.blogCommentRepository.getComments(id);
    }

    async deleteComments(id: string) {
        return this.blogCommentRepository.deleteComment(id)
    }

    async getMyBlogs(id:string){
        return this.blogRepository.getMyBlogs(id);
    }

    async searchBlogs(searchText:string){
        return this.blogRepository.searchBlogs(searchText);
    }

    async addBlogRating(rating:number,id:string){
        return this.blogRepository.addBlogRating(rating,id)
    }
}
