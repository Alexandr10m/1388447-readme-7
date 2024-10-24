import {Transform} from "class-transformer";
import {ArrayNotEmpty, IsArray, IsIn, IsNumber, IsOptional, IsUUID} from "class-validator";

import {SortDirection} from "@project/core";

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_PAGE_COUNT,
  DEFAULT_SORT_DIRECTION
} from './blog-post.constant';

export class BlogPostQuery {
  @Transform(({value}) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', {each: true})
  @IsArray()
  @ArrayNotEmpty()
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
