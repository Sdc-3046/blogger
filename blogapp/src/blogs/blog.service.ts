/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogTemplateDto } from 'src/dto/blog.template.dto';
import { UserEntity } from 'src/entities/user.entity';
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

    async getBlogById(id:number){
        return this.blogRepository.getBlogById(id);
    }

    async deleteBlogById(id:number,user:UserEntity){
        return this.blogRepository.deleteBlogById(id,user);
    }

    async updateBlogById(id:number,blogTemplateDto:BlogTemplateDto,user:UserEntity)
    {
        return this.blogRepository.updateBlogById(id,blogTemplateDto,user)
    }

    async createOrupdateBlog(user:UserEntity,blogTemplateDto:BlogTemplateDto){
        return this.blogRepository.createOrupdateBlog(user,blogTemplateDto);
    }

    async addComment(id: number, userComment: string, user: UserEntity) {
        return this.blogCommentRepository.addComment(id, userComment, user);
    }

    async getComments(id: number) {
        return this.blogCommentRepository.getComments(id);
    }

    async deleteComments(id: number) {
        return this.blogCommentRepository.deleteComment(id)
    }
}
