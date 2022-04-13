/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { BlogTag } from "src/blogs/blog.tag.enum";

@InputType()
export class BlogTemplateDto{

    @Field({nullable:true})
    id:number;

    @Field({nullable:true})
    blogTitle: string;

    @Field({nullable:true})
    blogContent: string;

    @Field({nullable:true})
    blogTags: BlogTag;

    @Field({nullable:true})
    blogDate: string;

    @Field({nullable:true})
    blogRating: number;
}