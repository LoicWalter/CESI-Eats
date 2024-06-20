import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Microservices, RmqService } from 'libs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions(Microservices.NOTIFICATIONS));
  app.startAllMicroservices();
}
bootstrap();
