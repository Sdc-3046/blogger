/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */

import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class BlogType{

    @Field()
    blogRating: Number | null;

}