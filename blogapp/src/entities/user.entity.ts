/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Unique } from 'typeorm';
import { blogpost } from './blogposts.entity';
import { MaxLength, MinLength } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('bloggers')
@Unique(['userEmail'])
@ObjectType()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    userEmail: string;

    @Column()
    @Field()
    userPassword: string;

    @Column()
    @Field()
    userCity: string;

    @Column()
    @Field()
    userState: string;

    @Column()
    @Field()
    userCountry: string;

    @Column()
    @MinLength(6)
    @MaxLength(6)
    @Field()
    userPostalCode: number;

    @Column()
    @Field()
    userBirthDate: Date;

    @Column()
    @Field()
    userGender: string;

    @OneToMany(type => blogpost, blog => blog.user, { eager: true, onDelete: 'SET NULL' })
    blogs: blogpost[];
}