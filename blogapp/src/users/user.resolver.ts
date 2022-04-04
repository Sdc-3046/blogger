/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UserResolver {

    constructor(private userServices:UsersService) {
        
    }
    @Query(()=>UserEntity)
    getUser(){
        
    }
}
