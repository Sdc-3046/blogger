/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "./blogposts.entity";

@ObjectType()
@Entity('comment')
export class BlogCommentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field({nullable:true})
    userName: string;

    @Column()
    @Field({nullable:true})
    userComment: string;

    @Column()
    @Field()
    blogId: number;

    @ManyToOne(type => BlogEntity, blog => blog.comments, { eager: true, onDelete: "SET NULL" })
    blog: BlogEntity;
}