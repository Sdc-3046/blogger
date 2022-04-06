/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {
            expiresIn: 3600,
        }
    }),
    PassportModule.register({
        defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserRepository])],
    providers:[UsersService,UserResolver,JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
