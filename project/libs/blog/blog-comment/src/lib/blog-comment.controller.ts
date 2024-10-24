import {Controller, Param, Get} from '@nestjs/common';
import {BlogCommentService} from "./blog-comment.service";
import {fillDto} from "@project/helpers";
import {CommentRdo} from './blog-comment.rdo'

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

}
