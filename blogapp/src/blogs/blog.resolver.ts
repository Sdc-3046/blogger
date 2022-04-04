/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Query, Resolver } from '@nestjs/graphql';
import { blogpost } from 'src/entities/blogposts.entity';
import { BlogService } from './blog.service';

@Resolver(()=>blogpost)
export class BlogResolver {

    constructor(private blogService:BlogService){

    }

    @Query(()=>blogpost)
    getAll(){
        this.blogService.getBlogs();
    }

}
