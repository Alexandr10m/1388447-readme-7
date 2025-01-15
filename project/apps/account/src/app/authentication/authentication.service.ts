import dayjs from "dayjs";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
  HttpException,
  HttpStatus,
  Logger, Inject,
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ConfigType} from "@nestjs/config";

import {BlogUserRepository, BlogUserEntity} from "../blog-user";
import {CreateUserDto} from "./data-transfer-object/create-user.dto";
import {UserRole, Token, User} from "@project/core";
import {AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from "./authentication.constant";
import {LoginUserDto} from "./data-transfer-object/login-user.dto";
import jwtConfig from "../jwt/jwt.config";
import {RefreshTokenService} from "../../../../../libs/account/refresh-token-module/src/lib/refresh-token.service";
import {createJWTPayload} from "../../../../../libs/shared/helpers/src/lib/jwt";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {...accessTokenPayload, tokenId: crypto.randomUUID()};
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return {accessToken, refreshToken}
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Error when token is creating.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return existUser;
  }
}
