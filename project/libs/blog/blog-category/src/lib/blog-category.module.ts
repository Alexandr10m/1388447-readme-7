import { Module } from '@nestjs/common';
import {PrismaClientModule} from "@project/blog-models";
import {BlogCategoryRepository} from "./blog-category.repository";
import {BlogCategoryService} from "./blog-category.service";
import {BlogCategoryFactory} from "./blog-category.factory";
import {BlogCategoryController} from "./blog-category.controller";

@Module({
  imports: [PrismaClientModule],
  providers: [BlogCategoryRepository, BlogCategoryService, BlogCategoryFactory],
  controllers: [BlogCategoryController],
  exports: [BlogCategoryService]
})
export class BlogCategoryModule {}
