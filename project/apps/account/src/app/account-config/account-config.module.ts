import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import applicationConfig from './app.config';
import mongoConfig from './mongo.config';
import {ENV_USERS_FILE_PATH} from './account-config.constants';
import jwtConfig from "../jwt/jwt.config";
import {rabbitConfig} from "./index";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
    envFilePath: ENV_USERS_FILE_PATH,
  })],
})
export class AccountConfigModule {}
