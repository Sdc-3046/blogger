/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */

import { Query, Resolver } from '@nestjs/graphql';
import { blogpost } from 'src/entities/blogposts.entity';

@Resolver(()=>blogpost)
export class BlogResolver {

    @Query(()=>blogpost)
    getAll(){
        
    }

}
