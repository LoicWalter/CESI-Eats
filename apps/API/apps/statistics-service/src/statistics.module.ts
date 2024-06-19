import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import * as Joi from 'joi';
import { Microservices, RmqModule } from 'libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_STATISTICS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    RmqModule.register({ name: Microservices.RESTAURANTS }),
    RmqModule.register({ name: Microservices.ORDERS }),
    RmqModule.register({ name: Microservices.DELIVERIES }),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
