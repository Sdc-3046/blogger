import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogTemplateDto } from '../blogs/dto/blog.template.dto';
import { BlogEntity } from '../entities/blogposts.entity';
import { BlogService } from './blog.service';
import { GetUser } from '../users/get.user.decorator';
import { UserEntity } from '../entities/user.entity';
import { GQLAuthGuard } from '../users/gql.authguard';
import { BlogCommentEntity } from '../entities/blog.comment.entity';
import { BlogFilter } from './blog.filter';

@Resolver(()=>BlogEntity)
@UseGuards(GQLAuthGuard)
export class BlogResolver {

    constructor(private blogservice:BlogService){

    }

    @Mutation(()=>BlogEntity,{name:'newBlog'})
    createBlog(@GetUser()user:UserEntity,@Args('blog') blogTemplateDto:BlogTemplateDto) {
        return this.blogservice.createBlog(user,blogTemplateDto);
    }

    @Query(()=>[BlogEntity])
    getBlogList(@Args('filter')args:BlogFilter) {
        return this.blogservice.getBlogs(args);
    }

    @Query(()=>BlogEntity)
    getBlogById(@Args('id')id:string){
        return this.blogservice.getBlogById(id);
    }

    @Mutation(()=>BlogEntity, {name:'deleteBlog'})
    deleteBlog(@GetUser()user:UserEntity,@Args('id') id:string)
    {
        return this.blogservice.deleteBlogById(id,user);
    }

    @Mutation(()=>BlogEntity, {name:'updateBlog'})
    updateBlog(@GetUser('user')user:UserEntity,@Args('updatedBlog') blogTemplateDto:BlogTemplateDto){
        return this.blogservice.updateBlogById(blogTemplateDto,user)
    }


    @Mutation(()=>BlogEntity,{nullable:true,name:'createOrupdateBlog'})
    createOrupdate(@GetUser()user:UserEntity,@Args('createOrupdateBlog')blogTemplateDto:BlogTemplateDto){
        return this.blogservice.createOrupdateBlog(user,blogTemplateDto);
    }

    @Mutation(()=>BlogCommentEntity,{nullable:true, name:'addBlogComment'})
    addComment(@Args('id') id: string, @Args('userComment') userComment: string, @GetUser() user: UserEntity) {
        return this.blogservice.addComment(id, userComment, user);
    }

    @Mutation(()=>String ,{nullable:true, name:'deleteBlogComment'})
    deleteComments(@Args('id') id: string) {
        return this.blogservice.deleteComments(id);
    }
    
    @Query(()=>[BlogCommentEntity],{nullable:true,name:'getBlogComments'})
    getComments(@Args('id') id: string) {
        return this.blogservice.getComments(id);
    }

    @Query(()=>[BlogEntity],{nullable:true, name:'getMyBlogs'})
    getMyBlogs(@Args('id')id:string){
        return this.blogservice.getMyBlogs(id);
    }

    @Query(()=>[BlogEntity], {nullable:true, name:'searchBlogs'})
    searchBlogs(@Args('searchText')searchText:string){
        return this.blogservice.searchBlogs(searchText);
    }

    @Mutation(()=>BlogEntity,{name:'addBlogRating'})
    addBlogRating(@Args('rating')rating:number,@Args('id')id:string){
        return this.blogservice.addBlogRating(rating,id);
    }

}
