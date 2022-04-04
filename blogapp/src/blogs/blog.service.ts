import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from './blog.repository';
import { BlogTag } from './blog.tag.enum';

@Injectable()
export class BlogService {

    constructor(private blogRepository:BlogPostRepository) {}
    

    async getBlogs(){
        return this.blogRepository.getBlogList();
    }

    createBlog(blogTitle: string, blogContent: string, blogTags: BlogTag, blogDate: Date, ) {
        return this.blogRepository.createBlog(blogTitle, blogContent, blogTags, blogDate);
    }
}
