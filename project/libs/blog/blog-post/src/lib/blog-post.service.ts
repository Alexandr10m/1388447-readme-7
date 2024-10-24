import { Injectable, NotFoundException } from '@nestjs/common'

import {PaginationResult} from '@project/core';
import {BlogCategoryService} from "@project/blog-category";
import {BlogCommentFactory, BlogCommentRepository, CommentDto, BlogCommentEntity} from "@project/blog-comment";

import {BlogPostRepository} from "./blog-post.repository";
import {BlogPostEntity} from "./blog-post.entity";
import {BlogPostQuery} from './blog-post.query'
import {BlogPostFactory} from './blog-post.factory';
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCategoryService: BlogCategoryService,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const categories = await this.blogCategoryService.getCategoriesByIds(dto.categories);
    const newPost = BlogPostFactory.createFromCreatePostDto(dto, categories);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameCategories = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'categories' && value) {
        const currentCategoryIds = existsPost.categories.map((category) => category.id);
        isSameCategories = currentCategoryIds.length === value.length &&
          currentCategoryIds.some((categoryId) => value.includes(categoryId));

        if (! isSameCategories) {
          existsPost.categories = await this.blogCategoryService.getCategoriesByIds(dto.categories);
        }
      }
    }

    if (isSameCategories && ! hasChanges) {
      return existsPost;
    }

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(postId: string, dto: CommentDto): Promise<BlogCommentEntity> {
    const existPost = await this.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existPost.id);
    await this.blogCommentRepository.save(newComment);
    return newComment
  }

}
