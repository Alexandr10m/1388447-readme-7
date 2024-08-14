import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@example.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Victor',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Sanchez',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User birth date',
    example: '2020-01-01',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User hash date',
    example: '987erhiu893',
  })
  public password: string;
}
