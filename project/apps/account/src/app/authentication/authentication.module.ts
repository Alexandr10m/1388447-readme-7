import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

import {BlogUserModule} from '../blog-user'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {JwtAccessStrategy} from "../jwt/strategies/jwt-access.strategy";
import {getJwtOptions} from "../jwt/get-jwt-options";

@Module({
  imports: [BlogUserModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: getJwtOptions,
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
})
export class AuthenticationModule {}
