import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Microservices, RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions(Microservices.AUTH, true));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  app.setGlobalPrefix('users-api');
  await app.listen(7001);
}
bootstrap();
