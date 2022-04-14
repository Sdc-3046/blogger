import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "src/entities/user.entity";

@ObjectType()
export class SignInResponse{
    @Field()
    token:string;

    @Field()
    user: UserEntity;
}