import {Module} from '@nestjs/common';
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {getRabbitMQOptions} from "@project/helpers";
import {NotifyService} from "./account-notify.service";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})

export class AccountNotifyModule {}
