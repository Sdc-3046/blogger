/* eslint-disable prettier/prettier */
import { NotFoundException } from "@nestjs/common";
import { BlogTemplateDto } from "src/dto/blog.template.dto";
import { BlogEntity } from "src/entities/blogposts.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogTag } from "./blog.tag.enum";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>{

    async createBlog(blogTemplateDto:BlogTemplateDto) {

        const {blogTitle,blogContent,blogTags,blogDate,blogRating,userId}=blogTemplateDto
        
        if (blogTitle.length === 0 && blogContent.length === 0) {
            return 'Blog title and Blog content cannot be empty';
        }

        const blog = new BlogEntity();
        blog.blogTitle = blogTitle;
        blog.blogContent = blogContent;
        blog.blogDate=blogDate;
        blog.blogRating=blogRating;
        blog.userId=userId;
        blog.blogTags = blogTags;
        await this.save(blog);
        return blog;
    }

    async getBlogList() {
        console.log("getblog executed")
        const bloglist = await this.find()
        console.log(bloglist)
        if (bloglist) {
            return bloglist;
        }
        else {
            return 'No blogs yet.'
        }
    }

    async getBlogById(id:number){
        const targetblog=await this.findOne(id);
        if(targetblog){
            return targetblog;
        }
        else{
            return new NotFoundException();
        }
    }

    async deleteBlogById(id:number){
        const targetblog=await this.findOne(id);
        if(targetblog){
            await this.delete(targetblog);
            return targetblog;
        }
        else{
            return new NotFoundException();
        }
    }

    async updateBlogById(id:number,blogTemplateDto:BlogTemplateDto)
    {
        const targetblog=await this.findOne(id);
        if(targetblog)
        {
            const {blogTitle,blogContent,blogTags,blogDate,blogRating,userId}=blogTemplateDto;
        
            if (blogTitle.length === 0 && blogContent.length === 0) {
                return 'Blog title and Blog content cannot be empty';
            }

            targetblog.blogTitle = blogTitle;
            targetblog.blogContent = blogContent;
            targetblog.blogDate=blogDate;
            targetblog.blogRating=blogRating;
            targetblog.userId=userId;
            targetblog.blogTags = blogTags;
            await this.save(targetblog);
        }
        else{
            return new NotFoundException();
        }
    }
}