import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { UserEntity } from "../entities/user.entity";
import { ProfileDto } from "./dto/profile.dto";
import { UserResolver } from "./user.resolver";
import { UsersService } from "./users.service";


describe('UserResolver', ()=>{
    let resolver:UserResolver;
    const userEmail='demo@gmail.com';
    const userEntity=new UserEntity();
    const profile=new ProfileDto()
    const fakeUser
    const user={
        id:expect.any(String),
        firstName:expect.any(String),
            lastName:expect.any(String),
            userEmail:expect.any(String),
            userCity:null,
            userCountry:null,
            userState:null,
            userPostalCode:null,
            userGender:null,
            userBirthdate:null
    };

    const mockUserService={
        signup:jest.fn(dto=>{
            return {
            user
            }
        }),

        signin: jest.fn(dto=>{
            return {
                token:expect.any(String),
                user
            }
        }),


        getUserProfile: jest.fn(dto =>{
            return {
                    user
            }
        }),

        updateProfile:jest.fn(dto=>{
            return {
                user
            }
        })
    }
    
    /* 
    let mockUserService: DeepMocked<UsersService>;
    let mockUserRepository: DeepMocked<UserRepository>;
    let mockUserEntity: DeepMocked<UserEntity>;
    let mockauthCredentialsDto: DeepMocked<AuthCredentialsDto>; */

    beforeEach(async ()=>{
        
        /* mockUserService= createMock<UsersService>();
        mockUserEntity= createMock<UserEntity>();
        mockUserRepository= createMock<UserRepository>();
        mockauthCredentialsDto= createMock<AuthCredentialsDto>(); */

        const module:TestingModule=await Test.createTestingModule({
            providers:[UsersService,UserResolver],

        }).overrideProvider(UsersService).useValue(mockUserService).compile()
        
        resolver=module.get<UserResolver>(UserResolver);
    });

    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    })

    it('should create a user', ()=>{
        expect(resolver.signUp({firstName:'DemoFN', lastName:'DemoLN', userEmail:'demo@gmail.com',userPassword:'12345'})).toEqual({
            user
        })
    })

    it('should generate a token and return user entity', ()=>{
        expect(resolver.signIn({firstName:'null',lastName:'null', userEmail:'demo@gmail.com',userPassword:'12345'})).toEqual({
            token:expect.any(String),
            user
        })
    })

   it('should get user profile',()=>{
       expect(resolver.getUserProfile(userEntity,userEmail)).toEqual({
           user
       })
   })

   it('should get user profile',()=>{
    expect(resolver.updateProfile(userEntity,profile)).toEqual({
        user
    })
})
    
});
