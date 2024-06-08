import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { AuthGatewayController } from './auth-gateway.controller';
import { Microservices, RmqModule } from 'libs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RmqModule.register({ name: Microservices.AUTH }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads/profileimages',
      }),
    }),
  ],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
