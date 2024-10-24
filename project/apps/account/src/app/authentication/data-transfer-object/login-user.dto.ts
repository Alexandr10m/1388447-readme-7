import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';

import {AuthenticationValidateMessage} from '../authentication.constant'

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@example.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User hash password',
    example: '13hjlkh4h'
  })
  @IsString()
  public password: string;
}
