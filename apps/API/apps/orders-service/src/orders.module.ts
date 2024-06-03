import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaOrdersModule } from '@app/databases/orders/prisma/prisma-orders.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_URL_ORDERS: Joi.string().required(),
      }),
    }),
    PrismaOrdersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
