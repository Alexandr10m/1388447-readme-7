import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@example.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User hash password',
    example: '13hjlkh4h'
  })
  public password: string;
}
