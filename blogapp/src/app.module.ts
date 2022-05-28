import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCommentEntity } from './entities/blog.comment.entity';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { BlogEntity } from './entities/blogposts.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    BlogsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mastery',
      database: 'blogs',
      entities: [BlogEntity,UserEntity,BlogCommentEntity],
      synchronize: true,
    }),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [],
})
export class AppModule {}
