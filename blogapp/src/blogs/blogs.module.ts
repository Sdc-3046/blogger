/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlogRepository])],
    providers:[BlogService,BlogResolver]

})

export class BlogsModule {}
