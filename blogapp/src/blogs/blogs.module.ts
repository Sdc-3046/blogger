/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCommentEntity } from 'src/entities/blog.comment.entity';
import { BlogRepository } from './blog.repository';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { BlogCommentRepository } from './blogs.comments.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BlogRepository,BlogCommentRepository])],
    providers:[BlogService,BlogResolver]

})

export class BlogsModule {}
