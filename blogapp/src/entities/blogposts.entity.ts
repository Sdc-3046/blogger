/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { BlogCommentEntity } from "./blog.comment.entity";
import { UserEntity } from "./user.entity";
//import {BlogTag} from "../blogs/blog.tags.enum"
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class blogpost{
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

    @ManyToOne(type => UserEntity, user => user.blogs, { eager: false })
    user: UserEntity;

    @OneToMany(type => BlogCommentEntity, comment => comment.blog, { eager: false, onDelete: 'SET NULL' })
    comments: BlogCommentEntity[];
}