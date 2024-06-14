import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Microservices, RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions(Microservices.ORDERS));
  app.startAllMicroservices();
}
bootstrap();
