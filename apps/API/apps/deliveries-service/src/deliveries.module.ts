import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaDeliveriesModule } from '@app/databases/deliveries/prisma/prisma-deliveries.module';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import * as Joi from 'joi';
import { Microservices, RmqModule } from 'libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_URL_DELIVERIES: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_DELIVERIES_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    RmqModule.register({ name: Microservices.ORDERS }),
    PrismaDeliveriesModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
