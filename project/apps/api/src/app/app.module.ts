import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS} from "./app.config";
import {UsersController} from "./users.contoller";
import {CheckAuthGaurd} from "./guards/check-auth.gaurd";
import {BlogController} from "./blog.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGaurd],
})
export class AppModule {}
