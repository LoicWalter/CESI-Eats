import { NestFactory } from '@nestjs/core';
import { DeliveriesModule } from './deliveries.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Microservices, RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(DeliveriesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions(Microservices.DELIVERIES));
  app.startAllMicroservices();
}
bootstrap();
