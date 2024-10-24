import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from './blog-comment.constant';

export class CommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message!: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId!: string;
}
