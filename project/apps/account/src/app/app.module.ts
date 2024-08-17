import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountConfigModule, getMongooseOptions } from './account-config';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
