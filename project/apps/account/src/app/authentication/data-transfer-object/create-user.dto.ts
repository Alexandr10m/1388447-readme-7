import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsISO8601, IsString} from 'class-validator'

import {AuthenticationValidateMessage} from '../authentication.constant'

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@example.com',
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Victor',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Sanchez',
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2020-01-01',
  })
  @IsISO8601({}, {message: AuthenticationValidateMessage.DateBirthNotValid})
  public dateBirth: string;

  @ApiProperty({
    description: 'User hash date',
    example: '987erhiu893',
  })
  @IsString()
  public password: string;
}
