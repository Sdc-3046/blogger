import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class AuthCredentialsDto {

    @Field({nullable:true})
    firstName: string;

    @Field({nullable:true})
    lastName: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(25)
    @Field()
    userEmail: string;

    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(5)
    @Field()
    userPassword: string;
}