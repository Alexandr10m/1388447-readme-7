import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

import {BlogUserModule} from '../blog-user'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {JwtAccessStrategy} from "../jwt/strategies/jwt-access.strategy";
import {JwtRefreshStrategy} from "../jwt/strategies/jwt-refresh.strategy";
import {LocalStrategy} from "./strategies/local.strategy";
import {getJwtOptions} from "../jwt/get-jwt-options";
import {AccountNotifyModule} from "@project/account-notify";
import {RefreshTokenModel} from "../../../../../libs/account/refresh-token-module/src/lib/refresh-token.model";

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    AccountNotifyModule,
    RefreshTokenModel,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
