import { Field, InputType } from "@nestjs/graphql";
import { BlogType } from "./blog.type"

@InputType()
export class BlogFilter{
    
    @Field({nullable:true})
    rating:number | null;
    
}