import { Module } from '@nestjs/common';
import {BlogCategoryModule} from "@project/blog-category";
import {PrismaClientModule} from "@project/blog-models";
import {BlogCommentModule} from "@project/blog-comment";

import {BlogPostController} from "./blog-post.controller";
import {BlogPostService} from "./blog-post.service";
import {BlogPostFactory} from "./blog-post.factory";
import {BlogPostRepository} from "./blog-post.repository";

@Module({
  imports: [BlogCategoryModule, PrismaClientModule, BlogCommentModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostFactory, BlogPostRepository],
  exports: [BlogPostService],
})
export class BlogPostModule {}
