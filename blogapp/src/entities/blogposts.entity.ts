import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BlogCommentEntity } from "./blog.comment.entity";
import { UserEntity } from "./user.entity";

@ObjectType()
@Unique(['blogTitle'])
@Entity()
export class BlogEntity{
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @IsNotEmpty()
    @Field({nullable:true})
    blogTitle: string;

    @IsNotEmpty()
    @Column()
    @Field({nullable:true})
    blogContent: string;

    @Column({default:null})
    @Field()
    blogTags: string;

    @Column({default:new Date()})
    @Field()
    blogDate: Date;

    @Column({default:null})
    @Field({nullable:true})
    blogRating: number;
    

    @Column()
    @Field()
    userId: string;

    @ManyToOne(type => UserEntity, user => user.blogs)
    user: UserEntity;

    @OneToMany(type => BlogCommentEntity, comment => comment.blog, { onDelete: 'SET NULL' })
    comments: BlogCommentEntity[];

}