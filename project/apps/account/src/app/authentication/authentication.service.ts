import dayjs from "dayjs";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
  Inject,
} from '@nestjs/common';
import {ConfigType, ConfigService} from '@nestjs/config';

import {BlogUserRepository, BlogUserEntity} from "../blog-user";
import {CreateUserDto} from "./data-transfer-object/create-user.dto";
import {UserRole} from "@project/core";
import {AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from "./authentication.constant";
import {LoginUserDto} from "./data-transfer-object/login-user.dto";
import {dbConfig} from "../account-config";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(dbConfig.KEY) private databaseConfig: ConfigType<typeof dbConfig>,
    private readonly configService: ConfigService,
  ) {
    console.log('Approach (getting .env) with KEY - Host :', databaseConfig.host)
    console.log('Approach (getting .env) with ConfigService - Host :', configService.get<string>('db.host'))
  }

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
}
