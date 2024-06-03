import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaUsersModule } from '@app/databases/users/prisma/prisma-users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_URL_USERS: Joi.string().required(),
      }),
    }),
    PrismaUsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
