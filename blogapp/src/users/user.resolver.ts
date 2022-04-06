/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthCredentialsDto } from 'src/dto/auth.credentials.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfileDto } from 'src/dto/profile.dto';

@Resolver()
export class UserResolver {

    constructor(private userService:UsersService) {
        
    }
    @Mutation(()=>UserEntity)
    @UsePipes(ValidationPipe)
    signUp(@Args('user') authCredentialsDto: AuthCredentialsDto) {
        return this.userService.signup(authCredentialsDto);
    }


    @Query(()=>UserEntity)
    @UsePipes(ValidationPipe)
    signIn(@Args('user') authCredentialsDto: AuthCredentialsDto) {
        console.log(authCredentialsDto.userEmail)
        return this.userService.signin(authCredentialsDto);
    }

    @Mutation(()=>UserEntity)
    updateProfile(@Args('userProfile') profileDto: ProfileDto) {
        return this.userService.updateProfile(profileDto);
    }

    @Query(()=>UserEntity)
    getUserProfile(@Args('userEmail') userEmail: string) {
        return this.userService.getUserProfile(userEmail)
    }
}
