/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { blogpost } from "./blogposts.entity";

@ObjectType()
@Entity('comment')
export class BlogCommentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    userName: string;

    @Column()
    @Field()
    userComment: string;

    @Column()
    @Field()
    blogId: number;

    @ManyToOne(type => blogpost, blog => blog.comments, { eager: true, onDelete: "SET NULL" })
    blog: blogpost;
}