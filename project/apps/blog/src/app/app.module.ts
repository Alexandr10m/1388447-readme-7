import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BlogCategoryModule} from "@project/blog-category";

@Module({
  imports: [BlogCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
