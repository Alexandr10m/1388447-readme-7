import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '23lkj3lk3r3r33'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/avatar.png',
  })
 @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth in ISO format',
    example: '2020-01-01',
  })
 @Expose()
  public dateOfBirth: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@gmail.com',
  })
 @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
 @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Dou',
  })
 @Expose()
  public lastname: string;
}
