/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCommentEntity } from './entities/blog.comment.entity';
import { blogpost } from './entities/blogposts.entity';
import { UserEntity } from './entities/user.entity';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { BlogService } from './blogs/blog.service';
import { UsersService } from './users/users.service';
import { BlogResolver } from './blogs/blog.resolver';
import { UserResolver } from './users/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6000,
      username: 'postgres',
      password: 'sdc1234',
      database: 'blogs',
      entities: [blogpost,UserEntity,BlogCommentEntity],
      synchronize: false,
    }),
    BlogsModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [BlogService, UsersService, BlogResolver, UserResolver],
})
export class AppModule {}
