import { Field, InputType } from "@nestjs/graphql";
import { BlogTag } from "..//blog.tag.enum";

@InputType()
export class BlogTemplateDto{

    @Field({nullable:true})
    id:string;

    @Field({nullable:true})
    blogTitle: string;

    @Field({nullable:true})
    blogContent: string;

    @Field({nullable:true})
    blogTags: BlogTag;

    @Field({nullable:true})
    blogDate: Date;

    @Field({nullable:true})
    blogRating: number;
}