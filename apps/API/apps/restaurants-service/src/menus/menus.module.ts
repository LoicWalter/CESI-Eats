import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaRestaurantsModule } from '@app/databases/restaurants/prisma/prisma-restaurants.module';
import configuration from '../config/configuration';
import * as Joi from 'joi';

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
    PrismaRestaurantsModule,
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
