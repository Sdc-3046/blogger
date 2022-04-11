/* eslint-disable prettier/prettier */
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { use } from "passport";
import { AuthCredentialsDto } from "src/dto/auth.credentials.dto";
import { ProfileDto } from "src/dto/profile.dto";
import { UserEntity } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    
    async signup(authCredentialsdto: AuthCredentialsDto) {
        const user = new UserEntity()

        user.firstName = authCredentialsdto.firstName;
        user.lastName = authCredentialsdto.lastName
        user.userEmail = authCredentialsdto.userEmail;
        user.userPassword = authCredentialsdto.userPassword;

        await user.save();
        const {userPassword, ...result} = user
        return result;
    }

    async signin(authCredentialsDto: AuthCredentialsDto) {

        const { firstName, lastName, userEmail, userPassword } = authCredentialsDto;

        const user=await this.findOne({userEmail})
        
        if (user) {
            if (user.userPassword === authCredentialsDto.userPassword) {
                const {userPassword, ...result} = user
                return result;
            }
        }
        throw new NotFoundException('User not found');
    }

    async getUserProfile(userEmail: string,user:UserEntity) {
        
        const targetuser=await this.findOne({userEmail})
        
        if(targetuser.id!==user.id)
        {
            return new UnauthorizedException()
        }

        if (targetuser) {
            const {userPassword, ...result} = targetuser
            return result;
        }
        else {
            throw new NotFoundException;
        }
    }

    async updateProfile(profileDto: ProfileDto, user:UserEntity) {
        const { firstName, lastName, userEmail, userPassword, userCity, userState, userCountry, userPostalCode, userBirthDate, userGender } = profileDto;

        const targetuser = await this.findOne({ userEmail });

        if(targetuser.id!==user.id)
        {
            return new UnauthorizedException();
        }

        if (targetuser) {
            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (userEmail) {
                user.userEmail = userEmail;
            }
            if (userCity) {
                user.userCity = userCity;
            }
            if (userState) {
                user.userState = userState;
            }
            if (userCountry) {
                user.userCountry = userCountry;
            }
            if (userPostalCode) {
                user.userPostalCode = userPostalCode;
            }
            if (userBirthDate) {
                user.userBirthDate = userBirthDate;
            }
            if (userGender) {
                user.userGender = userGender;
            }
            user.save()
            const {userPassword, ...result} = user
            return result;
        }
        else {
            throw new NotFoundException('User not found')
        }
    }

}