import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaRestaurantsModule } from '@app/databases/restaurants/prisma/prisma-restaurants.module';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { RmqModule } from 'libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_URL_RESTAURANTS: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_RESTAURANTS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    PrismaRestaurantsModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
