import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogTemplateDto } from "src/blogs/dto/blog.template.dto";
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
        const result=await this.save(blog);
        return result;
    }

    async getBlogList(args:BlogFilter) {
        
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
        const query=this.createQueryBuilder('blogs');
        query.andWhere('blogs.id=:id',{id:id});

        const targetblog=await query.getOneOrFail();

        if(targetblog){
            return targetblog;
        }
        else{
            return new NotFoundException();
        }
    }

    async deleteBlogById(id:number,user:UserEntity){

        const query=this.createQueryBuilder('blogs');
        query.andWhere('blogs.id=:id',{id:id});

        const targetblog=await query.getOneOrFail();
        if(targetblog.userId!==user.id)
        {
            return new UnauthorizedException();
        }
        if(targetblog){
            await this.delete(targetblog);
            return targetblog;
        }
        else{
            throw new NotFoundException();
        }
    }

    async updateBlogById(blogTemplateDto:BlogTemplateDto,user:UserEntity)
    {
        const {id,blogTitle,blogContent,blogTags,blogDate,blogRating}=blogTemplateDto;
        
        const query=this.createQueryBuilder('blogs');
        query.andWhere('blogs.id=:id',{id:id});
        
        const targetblog=await query.getOneOrFail();
        if(targetblog.userId!==user.id)
        {
            throw new UnauthorizedException();
        }
        if(targetblog)
        {        
            if (blogTitle.length === 0 && blogContent.length === 0) {
                return 'Blog title and Blog content cannot be empty';
            }

            targetblog.blogTitle = blogTitle;
            targetblog.blogContent = blogContent;
            targetblog.blogDate=blogDate;
            targetblog.blogRating=blogRating;
            targetblog.blogTags = blogTags;
            const updatedBlog=await this.save(targetblog);
            return updatedBlog;
        }
        else{
            throw new NotFoundException();
        }
    }

    async createOrupdateBlog(user:UserEntity,blogTemplateDto:BlogTemplateDto){

        const {id,blogTitle,blogContent,blogTags,blogDate,blogRating}=blogTemplateDto;
        if(id===undefined || id===null){
            return this.createBlog(user,blogTemplateDto);
        }

        try{
            const query=this.createQueryBuilder('blogs');
            query.andWhere('blogs.id=:id',{id:id});

            const targetblog=await query.getOneOrFail();
            
            if(targetblog)
            {
                return this.updateBlogById(blogTemplateDto,user);
            }
        }
        catch{
            throw new BadRequestException();
        }
        

    }
}