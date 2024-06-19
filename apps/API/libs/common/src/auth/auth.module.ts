import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';
import { Microservices } from '../microservices/microservices.names';

@Module({
  imports: [RmqModule.register({ name: Microservices.AUTH })],
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
