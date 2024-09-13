import {Global, Module} from "@nestjs/common";

import {PrismaClientService} from "@project/blog-models";

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})

export class PrismaClientModule {}
