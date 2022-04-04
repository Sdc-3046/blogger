/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { BlogCommentEntity } from "./blog.comment.entity";
import { UserEntity } from "./user.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class BlogEntity{
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @IsNotEmpty()
    @Field()
    blogTitle: string;

    @IsNotEmpty()
    @Column()
    @Field()
    blogContent: string;

    @Column()
    @Field()
    blogTags: string;

    @Column()
    @Field()
    blogDate: Date;

    @Column()
    @Field()
    blogRating: number;

    @IsNotEmpty()
    @Column()
    @Field()
    userId: number;

}