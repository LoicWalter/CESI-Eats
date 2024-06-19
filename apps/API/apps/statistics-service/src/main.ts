import { NestFactory } from '@nestjs/core';
import { StatisticsModule } from './statistics.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Microservices, RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(StatisticsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions(Microservices.STATISTICS));
  app.startAllMicroservices();
}
bootstrap();
