/* eslint-disable prettier/prettier */
import { NotFoundException } from "@nestjs/common";
import { BlogTemplateDto } from "src/dto/blog.template.dto";
import { BlogEntity } from "src/entities/blogposts.entity";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>{

    async createBlog(user:UserEntity,blogTemplateDto:BlogTemplateDto) {

        const {blogTitle,blogContent,blogTags,blogDate,blogRating}=blogTemplateDto
        
        if (blogTitle.length === 0 && blogContent.length === 0) {
            return 'Blog title and Blog content cannot be empty';
        }

        const blog = new BlogEntity();
        blog.blogTitle = blogTitle;
        blog.blogContent = blogContent;
        blog.blogDate=blogDate;
        blog.blogRating=blogRating;
        blog.userId=user.id;
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
            const {blogTitle,blogContent,blogTags,blogDate,blogRating}=blogTemplateDto;
        
            if (blogTitle.length === 0 && blogContent.length === 0) {
                return 'Blog title and Blog content cannot be empty';
            }

            targetblog.blogTitle = blogTitle;
            targetblog.blogContent = blogContent;
            targetblog.blogDate=blogDate;
            targetblog.blogRating=blogRating;
            targetblog.blogTags = blogTags;
            await this.save(targetblog);
            return targetblog;
        }
        else{
            return new NotFoundException();
        }
    }
}