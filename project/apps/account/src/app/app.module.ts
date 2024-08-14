import { Module } from '@nestjs/common';

import { BlogUserModule } from './blog-user';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountConfigModule } from './account-config';

@Module({
  imports: [BlogUserModule, AuthenticationModule, AccountConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
