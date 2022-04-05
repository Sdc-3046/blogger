/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class BlogTemplateDto{

    @Field({nullable:true})
    blogTitle: string;

    @Field({nullable:true})
    blogContent: string;

    @Field({nullable:true})
    blogTags: string;

    @Field({nullable:true})
    blogDate: string;

    @Field({nullable:true})
    blogRating: number;
    
    @Field()
    userId: number;

}