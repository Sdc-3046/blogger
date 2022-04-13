/* eslint-disable prettier/prettier */
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BlogType } from "./blog.type"

@InputType()
export class BlogFilter{
    
    @Field()
    filter?:BlogType;
    
}