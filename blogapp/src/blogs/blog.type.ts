import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class BlogType{

    @Field({nullable:true})
    rating: null | number;

}