/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BlogTemplateDto } from 'src/dto/blog.template.dto';
import { UserEntity } from 'src/entities/user.entity';
import { BlogRepository } from './blog.repository';
import { BlogTag } from './blog.tag.enum';

@Injectable()
export class BlogService {

    constructor(private blogRepository:BlogRepository) {}
    

    async getBlogs(){
        
        return this.blogRepository.getBlogList();
    }

    createBlog(user:UserEntity, blogTemplateDto:BlogTemplateDto ) {
        return this.blogRepository.createBlog(user,blogTemplateDto);
    }

    async getBlogById(id:number){
        return this.blogRepository.getBlogById(id);
    }

    async deleteBlogById(id:number){
        return this.blogRepository.deleteBlogById(id);
    }

    async updateBlogById(id:number,blogTemplateDto:BlogTemplateDto)
    {
        return this.blogRepository.updateBlogById(id,blogTemplateDto)
    }
}
