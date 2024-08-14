import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq ID',
    example: '12ljk-23-5lkj2-3535-lkj'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: '89sdgf809sdg9',
  })
  @Expose()
  public accessToken: string;
}
