import {Controller, Body, Post, Get, Param, HttpStatus, UseGuards, Req, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';

import {MongoIdValidationPipe} from "@project/pipes";

import {AuthenticationService} from "./authentication.service";
import {CreateUserDto} from "./data-transfer-object/create-user.dto";
import {UserRdo} from './response-data-object/user.rdo';
import {LoggedUserRdo} from "./response-data-object/logged-user.rdo";
import {AuthenticationResponseMessage} from './authentication.constant';
import {fillDto} from "@project/helpers";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {LocalAccountGuard} from './guards/local-auth.guard';
import {JwtRefreshGuard} from "./guards/jwt-refresh.guard";
import {NotifyService} from "@project/account-notify";
import {RequestWithUser} from "../../../../../libs/shared/core/src/lib/types/request-with-user.interface";
import {RequestWithTokenPayload} from "../../../../../libs/shared/core/src/lib/types/request-with-token-payload.interface";

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

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
    const {email, firstname, lastname} = newUser;

    await this.notifyService.registerSubscriber({email, firstname, lastname});

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
  @UseGuards(LocalAccountGuard)
  @Post('login')
  public async login(@Req() {user}: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, {...user.toPOJO(), ...userToken})
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
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get a new access/refresh tokens`,
  })
  // ** auto transform id to number because ValidationPipe(transform: true) and id: number
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() {user: payload}): Promise<RequestWithTokenPayload> {
    return payload;
  }
}
