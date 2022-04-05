/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogTemplateDto } from 'src/dto/blog.template.dto';
import { BlogEntity } from 'src/entities/blogposts.entity';
import { BlogService } from './blog.service';
import { BlogTag } from './blog.tag.enum';

@Resolver(()=>BlogEntity)
export class BlogResolver {

    constructor(private blogservice:BlogService){

    }

    @Mutation(()=>BlogEntity,{name:'newBlog'})
    createBlog(@Args('blog') blogTemplateDto:BlogTemplateDto) {
        console.log("creating blog");
        return this.blogservice.createBlog(blogTemplateDto);
    }

    @Query(()=>[BlogEntity])
    getBlogList() {
        return this.blogservice.getBlogs();
    }

    @Query(()=>BlogEntity)
    getBlogById(@Args('id', {type: ()=> Int})id:number){
        return this.blogservice.getBlogById(id);
    }

    @Mutation(()=>BlogEntity, {name:'deleteBlog'})
    deleteBlog(@Args('id') id:number)
    {
        console.log(id);
        return this.blogservice.deleteBlogById(id);
    }

    @Mutation(()=>BlogEntity, {name:'updateBlog'})
    updateBlog(@Args('id') id:number,@Args('updatedBlog') blogTemplateDto:BlogTemplateDto){
        return this.blogservice.updateBlogById(id,blogTemplateDto)
    }

}
