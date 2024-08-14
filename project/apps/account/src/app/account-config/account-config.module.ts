import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import applicationConfig from './app.config';
import mongoConfig from './mongo.config';
import {ENV_USERS_FILE_PATH} from './account-config.constants';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [applicationConfig, mongoConfig],
    envFilePath: ENV_USERS_FILE_PATH,
  })],
})
export class AccountConfigModule {}
