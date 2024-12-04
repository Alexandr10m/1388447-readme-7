import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountConfigModule, getMongooseOptions } from './account-config';
import {AccountNotifyModule} from "@project/account-notify";

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    AccountNotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
