import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogTemplateDto } from "../blogs/dto/blog.template.dto";
import { BlogEntity } from "../entities/blogposts.entity";
import { UserEntity } from "../entities/user.entity";
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
        blog.blogAuthor=user.firstName+" "+user.lastName
        const result=await this.save(blog);
        return result;
    }

    async getBlogList(args:BlogFilter) {
        
        if(args.rating===null || args.rating===undefined || args.rating===0)
        {//if rating is not provided by the user if block will be executed
            const query=this.createQueryBuilder('blogs')
            const bloglist=await query.getMany();
            
            if(bloglist)
            {
                return bloglist;
            }
            else{
                return null;
            }
        }
        else{//if rating is provided by the user else block will be executed
            const query=this.createQueryBuilder('blog')
            
            query.andWhere('blog.blogRating=:rating',{rating:args.rating});
            const bloglist=await query.getMany();
            if (bloglist) {
                return bloglist;
            }
            else {
                return 'No blogs yet.'
            }   
        }
    }

    async getBlogById(id:string){
        const query=this.createQueryBuilder('blogs');
        query.andWhere('blogs.id=:id',{id:id});

        const targetblog=await query.getOneOrFail();

        if(targetblog){
            return targetblog;
        }
        else{
            throw new NotFoundException();
        }
    }

    async deleteBlogById(id:string,user:UserEntity){

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

    async updateBlog(blogTemplateDto:BlogTemplateDto,user:UserEntity)
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
        if(blogTitle===undefined || blogTitle===null){
            throw new BadRequestException();
        }

        try{
            const query=this.createQueryBuilder('blogs');
            query.andWhere('blogs.id=:id',{id:id});

            const targetblog=await query.getOneOrFail();
            
            if(targetblog)
            {
                return this.updateBlog(blogTemplateDto,user);
            }
        }
        catch{
            if(blogTitle!==null || blogTitle!==undefined){
                return this.createBlog(user,blogTemplateDto)
            }
            throw new BadRequestException();
        }
        

    }

    async getMyBlogs(id:string){
        
        try{
            const query=this.createQueryBuilder('blogs');
            query.andWhere('blogs.userId=:id',{id:id});

            const list=await query.getMany();
            return list;
        }
        catch{
            throw new NotFoundException();
        }  

    }

    async searchBlogs(searchText:string){
        
        try{

            const query=this.createQueryBuilder('blogs');
            query.andWhere('blogs.blogTitle LIKE :searchText',{searchText:'%'+searchText+'%'})
            const result=query.getMany();
            return result;
        }
        catch{
            throw new NotFoundException();
        }
    }

    async addBlogRating(rating:number,id:string){
        try{
            const query=this.createQueryBuilder('blogs');
            query.andWhere('blogs.id=:id',{id:id});
            const blog=await query.getOneOrFail();
            if(blog){
                blog.blogRating=blog.blogRating+rating;
                blog.blogRating=Math.ceil(blog.blogRating/2)
                this.save(blog);
                return blog;
            }            
        }
        catch{
            throw new NotFoundException();
        }
    }
}