/* eslint-disable prettier/prettier */
import { NotFoundException } from "@nestjs/common";
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
        return user;
    }

    async signin(authCredentialsDto: AuthCredentialsDto) {

        const { firstName, lastName, userEmail, userPassword } = authCredentialsDto;

        const user=await this.findOne({userEmail})
        
        if (user) {
            if (user.userPassword === authCredentialsDto.userPassword) {
                return user;
            }
        }
        throw new NotFoundException('User not found');
    }

    async getUserProfile(userEmail: string) {

        /* const query = this.createQueryBuilder('users')

        query.andWhere('users.userEmail=:userEmail', { userEmail: userEmail }) */

        //const targetuser = await query.getOne()
        const targetuser=await this.findOne({userEmail})

        if (targetuser) {
            return targetuser;
        }
        else {
            throw new NotFoundException;
        }
    }

    async updateProfile(profileDto: ProfileDto) {
        const { firstName, lastName, userEmail, userPassword, userCity, userState, userCountry, userPostalCode, userBirthDate, userGender } = profileDto;

        const user = await this.findOne({ userEmail });

        if (user) {
            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (userEmail) {
                user.userEmail = userEmail;
            }
            if (userPassword) {
                user.userPassword = userPassword;
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
            return user;
        }
        else {
            throw new NotFoundException('User not found')
        }
    }

}