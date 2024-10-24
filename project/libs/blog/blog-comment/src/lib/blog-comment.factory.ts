import {Injectable} from '@nestjs/common';
import {EntityFactory} from "@project/core";
import {BlogCommentEntity} from "./blog-comment.entity";
import {CommentDto} from "./create-comment.dto";

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: ReturnType<BlogCommentEntity["toPOJO"]>): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDto(dto: CommentDto, postId: string): BlogCommentEntity {
    const currentDate = new Date();
    return new BlogCommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    })
  }
}
