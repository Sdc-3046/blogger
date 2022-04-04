import { NotFoundException } from "@nestjs/common";
import { BlogEntity } from "src/entities/blogposts.entity";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogTag } from "./blog.tag.enum";

@EntityRepository(BlogEntity)
export class BlogPostRepository extends Repository<BlogEntity>{

    async createBlog(blogTitle: string, blogContent: string, blogTags: BlogTag, blogDate: Date) {


        if (blogTitle.length === 0 && blogContent.length === 0) {
            return 'Blog title and Blog content cannot be empty';
        }

        const blog = new BlogEntity();
        blog.blogTitle = blogTitle;
        blog.blogContent = blogContent;
        blog.blogTags = blogTags;
        return blog;
    }

    async getBlogList() {
        const bloglist = await this.find()
        if (await bloglist) {
            return bloglist;
        }
        else {
            return 'No blogs yet.'
        }
    }
}