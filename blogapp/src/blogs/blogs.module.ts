import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostRepository } from './blog.repository';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlogPostRepository])],
    providers:[BlogService,BlogResolver]

})

export class BlogsModule {}
