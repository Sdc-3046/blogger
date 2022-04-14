import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BlogCommentEntity } from "./blog.comment.entity";
import { UserEntity } from "./user.entity";

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

    @Column({default:null})
    @Field()
    blogTags: string;

    @Column({default:new Date().toISOString().slice(0,10)})
    @Field()
    blogDate: string;

    @Column({default:null})
    @Field({nullable:true})
    blogRating: number;
    

    @Column()
    @Field()
    userId: number;

    @ManyToOne(type => UserEntity, user => user.blogs, { eager: false })
    user: UserEntity;

    @OneToMany(type => BlogCommentEntity, comment => comment.blog, { eager: false, onDelete: 'SET NULL' })
    comments: BlogCommentEntity[];

}