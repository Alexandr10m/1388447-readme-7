import {Controller, Body, Post, Get, Param, HttpStatus} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';

import {AuthenticationService} from "./authentication.service";
import {CreateUserDto} from "./data-transfer-object/create-user.dto";
import {LoginUserDto} from "./data-transfer-object/login-user.dto";
import {UserRdo} from './response-data-object/user.rdo';
import {LoggedUserRdo} from "./response-data-object/logged-user.rdo";
import {AuthenticationResponseMessage} from './authentication.constant';


ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }
}
