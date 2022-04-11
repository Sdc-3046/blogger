/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogTemplateDto } from 'src/dto/blog.template.dto';
import { BlogEntity } from 'src/entities/blogposts.entity';
import { BlogService } from './blog.service';
import { GetUser } from 'src/users/get.user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { GQLAuthGuard } from 'src/users/gql.authguard';
import { userInfo } from 'os';

@Resolver(()=>BlogEntity)
@UseGuards(GQLAuthGuard)
export class BlogResolver {

    constructor(private blogservice:BlogService){

    }

    @Mutation(()=>BlogEntity,{name:'newBlog'})
    createBlog(@GetUser()user:UserEntity,@Args('blog') blogTemplateDto:BlogTemplateDto) {
        console.log("creating blog");
        return this.blogservice.createBlog(user,blogTemplateDto);
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
    deleteBlog(@GetUser()user:UserEntity,@Args('id') id:number)
    {
        console.log(id);
        return this.blogservice.deleteBlogById(id,user);
    }

    @Mutation(()=>BlogEntity, {name:'updateBlog'})
    updateBlog(@GetUser('user')user:UserEntity,@Args('id') id:number,@Args('updatedBlog') blogTemplateDto:BlogTemplateDto){
        return this.blogservice.updateBlogById(id,blogTemplateDto,user)
    }


    @Mutation(()=>BlogEntity,{nullable:true,name:'createOrupdateBlog'})
    createOrupdate(@GetUser()user:UserEntity,@Args('createOrupdateBlog')blogTemplateDto:BlogTemplateDto){
        return this.blogservice.createOrupdateBlog(user,blogTemplateDto);
    }

}
