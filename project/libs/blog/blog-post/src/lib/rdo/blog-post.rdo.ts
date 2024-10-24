import {Expose, Type} from 'class-transformer';

import {CategoryRdo} from '../../../../blog-category/src/lib/rdo/category.rdo';
import {CommentRdo} from "../../../../blog-comment/src/lib/blog-comment.rdo";

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public content: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => CategoryRdo)
  public categories: CategoryRdo[];

  @Expose()
  public comments: CommentRdo[];


}

