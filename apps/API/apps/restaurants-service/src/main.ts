import { NestFactory } from '@nestjs/core';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Microservices, RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions(Microservices.RESTAURANTS));
  app.startAllMicroservices();
}
bootstrap();
