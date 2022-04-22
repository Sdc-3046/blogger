import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/users/dto/auth.credentials.dto';
import { ProfileDto } from 'src/users/dto/profile.dto';
import { UserEntity } from 'src/entities/user.entity';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,private jwtService: JwtService) { }

  signup(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signin(authCredentialsDto: AuthCredentialsDto) {
    const user = this.userRepository.signin(authCredentialsDto);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const payload: JwtPayload = {
            userEmail: authCredentialsDto.userEmail,
            id: (await user).id,
        };
        console.log("Signed in")
        const token = this.jwtService.sign(payload)
        return {token,user};
    }

    getUserProfile(userEmail: string,user:UserEntity) {
        return this.userRepository.getUserProfile(userEmail,user)
    }

    updateProfile(profileDto: ProfileDto,user:UserEntity) {
        return this.userRepository.updateProfile(profileDto,user);
    }

}
