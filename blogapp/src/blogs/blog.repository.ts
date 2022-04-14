/* eslint-disable prettier/prettier */
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogTemplateDto } from "src/dto/blog.template.dto";
import { BlogEntity } from "src/entities/blogposts.entity";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogFilter } from "./blog.filter";

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

    async getBlogList(args:BlogFilter) {
        
        // eslint-disable-next-line prefer-const
        if(args.filter.rating===null || args.filter.rating===undefined)
        {
            const bloglist=await this.find()

            if(bloglist)
            {
                return bloglist;
            }
            else{
                return null;
            }
        }
        else{
            const query=this.createQueryBuilder('blog')
            query.andWhere('blog.blogRating=:rating',{rating:args.filter.rating});
            const bloglist=query.getMany();

            if (bloglist) {
                return bloglist;
            }
            else {
                return 'No blogs yet.'
            }
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

    async deleteBlogById(id:number,user:UserEntity){
        const targetblog=await this.findOne(id);
        if(targetblog.userId!==user.id)
        {
            return new UnauthorizedException();
        }
        if(targetblog){
            await this.delete(targetblog);
            return targetblog;
        }
        else{
            return new NotFoundException();
        }
    }

    async updateBlogById(id:number,blogTemplateDto:BlogTemplateDto,user:UserEntity)
    {
        const targetblog=await this.findOne(id);
        if(targetblog.userId!==user.id)
        {
            return new UnauthorizedException();
        }
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

    async createOrupdateBlog(user:UserEntity,blogTemplateDto:BlogTemplateDto){

        const {id,blogTitle,blogContent,blogTags,blogDate,blogRating}=blogTemplateDto;
        if(id===undefined || id===null){
            return this.createBlog(user,blogTemplateDto);
        }

        try{
            const targetblog=await this.findOneOrFail(id)
        
            if(targetblog)
            {
                return this.updateBlogById(id,blogTemplateDto,user);
            }
        }
        catch{
            return new BadRequestException();
        }
        

    }
}