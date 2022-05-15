import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { SignInResponse } from './signin.response';
import { GetUser } from './get.user.decorator';
import { GQLAuthGuard } from './gql.authguard';

@Resolver()
export class UserResolver {

    constructor(private userService:UsersService) {
        
    }
    @Mutation(()=>UserEntity)
    @UsePipes(ValidationPipe)
    signUp(@Args('user') authCredentialsDto: AuthCredentialsDto) {
        return this.userService.signup(authCredentialsDto);
    }


    @Query(()=>SignInResponse)
    @UsePipes(ValidationPipe)
    signIn(@Args('user') authCredentialsDto: AuthCredentialsDto) {
        return this.userService.signin(authCredentialsDto);
    }

    @Mutation(()=>UserEntity)
    @UseGuards(GQLAuthGuard)
    updateProfile(@GetUser()user:UserEntity,@Args('userProfile') profileDto: ProfileDto) {
        return this.userService.updateProfile(profileDto,user);
    }

    @Query(()=>UserEntity)
    @UseGuards(GQLAuthGuard)
    getUserProfile(@GetUser()user:UserEntity,@Args('userEmail') userEmail: string) {
        return this.userService.getUserProfile(userEmail,user)
    }
}
