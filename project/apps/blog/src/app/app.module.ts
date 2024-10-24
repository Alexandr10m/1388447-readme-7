import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BlogCategoryModule} from "@project/blog-category";
import {BlogCommentModule} from "@project/blog-comment";
import {BlogPostModule} from "@project/blog-post";

@Module({
  imports: [BlogCategoryModule, BlogCommentModule, BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
