import dayjs from "dayjs";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { JwtService} from "@nestjs/jwt";

import {BlogUserRepository, BlogUserEntity} from "../blog-user";
import {CreateUserDto} from "./data-transfer-object/create-user.dto";
import {UserRole, Token, TokenPayload, User} from "@project/core";
import {AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from "./authentication.constant";
import {LoginUserDto} from "./data-transfer-object/login-user.dto";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {
      firstname,
      lastname,
      email,
      password,
      dateBirth,
    } = dto;

    const blogUser = {
      firstname,
      lastname,
      email,
      role: UserRole.USER,
      avatar: '',
      dateOfBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXIST);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new ConflictException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
    return existUser;
  }

  public async getUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return {accessToken}
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Error when token is creating.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
