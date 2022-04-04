/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogEntity } from 'src/entities/blogposts.entity';
import { BlogService } from './blog.service';
import { BlogTag } from './blog.tag.enum';

@Resolver(()=>BlogEntity)
export class BlogResolver {

    constructor(private blogservice:BlogService){

    }

    @Mutation(()=>BlogEntity)
    createBlog( @Args('blogTitle') blogTitle: string, @Args('blogContent') blogContent: string, @Args('blogTags') blogTags: BlogTag, @Args('blogDate') blogDate: Date) {
        console.log(blogTitle)
        return this.blogservice.createBlog(blogTitle, blogContent, blogTags, blogDate);
    }

    @Query(()=>BlogEntity)
    getBlogList() {
        return this.blogservice.getBlogs();
    }

}
