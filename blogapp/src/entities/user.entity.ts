import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { BlogEntity } from './blogposts.entity';

@Entity('bloggers')
@Unique(['userEmail'])
@ObjectType()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    firstName: String;

    @Column()
    @Field()
    lastName: String;

    @Column()
    @Field()
    userEmail: String;

    @Column()
    @Field({nullable:true})
    userPassword: String;

    @Column({default:null})
    @Field({nullable:true})
    userCity: String;

    @Column({default:null})
    @Field({nullable:true})
    userState: String;

    @Column({default:null})
    @Field({nullable:true})
    userCountry: String;

    @Column({default:null})
    @MinLength(6)
    @MaxLength(6)
    @Field({nullable:true})
    userPostalCode: String;

    @Column({default:null})
    @Field({nullable:true})
    userBirthDate: Date;

    @Column({default:null})
    @Field({nullable:true})
    userGender: String;

    @OneToMany(type => BlogEntity, blog => blog.user, { eager: true, onDelete: 'SET NULL' })
    blogs: BlogEntity[];
}