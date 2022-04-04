/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}