import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { ProfileDto } from "./dto/profile.dto";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    
    async signup(authCredentialsdto: AuthCredentialsDto) {
        const user = new UserEntity()

        user.firstName = authCredentialsdto.firstName;
        user.lastName = authCredentialsdto.lastName
        user.userEmail = authCredentialsdto.userEmail;
        user.userPassword = authCredentialsdto.userPassword;

        const newUser=await user.save();
        const {userPassword, ...result} = newUser
        return result;
    }

    async signin(authCredentialsDto: AuthCredentialsDto) {

        const { firstName, lastName, userEmail, userPassword } = authCredentialsDto;

        const query=this.createQueryBuilder('users');
        query.andWhere('users.userEmail=:email',{email:userEmail});

        const targetuser=await query.getOneOrFail();
        
        if (targetuser) {
            if (targetuser.userPassword === authCredentialsDto.userPassword) {
                const {userPassword, ...result} = targetuser
                return result;
            }
        }
        throw new NotFoundException('User not found');
    }

    async getUserProfile(userEmail: string,user:UserEntity) {
        
        const query=this.createQueryBuilder('users');
        query.andWhere('users.userEmail=:email',{email:userEmail});

        const targetuser=await query.getOneOrFail();
        
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

        const query=this.createQueryBuilder('users');
        query.andWhere('users.userEmail=:email',{email:userEmail});

        const targetuser=await query.getOneOrFail();

        if(targetuser.id!==user.id)
        {
            throw new UnauthorizedException();
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
            const updatedUser =await user.save()
            const {userPassword, ...result} = updatedUser
            return result;
        }
        else {
            throw new NotFoundException('User not found')
        }
    }

}