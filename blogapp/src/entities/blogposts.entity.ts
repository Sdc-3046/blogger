/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class BlogEntity{
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @IsNotEmpty()
    @Field({nullable:true})
    blogTitle: string;

    @IsNotEmpty()
    @Column()
    @Field({nullable:true})
    blogContent: string;

    @Column()
    @Field()
    blogTags: string;

    @Column()
    @Field()
    blogDate: string;

    @Column()
    @Field({nullable:true})
    blogRating: number;
    

    @Column()
    @Field()
    userId: number;

}