import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class ProfileDto {

    @Field({nullable:true})
    firstName: string;

    @Field({nullable:true})
    lastName: string;

    @Field({nullable:true})
    userEmail: string;

    @Field({nullable:true})
    userPassword: string;

    @Field({nullable:true})
    userCity: string;

    @Field({nullable:true})
    userState: string;

    @Field({nullable:true})
    userCountry: string;

    @MinLength(6)
    @MaxLength(6)
    @Field({nullable:true})
    userPostalCode: number;

    @Field({nullable:true})
    userBirthDate: Date;

    @Field({nullable:true})
    userGender: string;
}