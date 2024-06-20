import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthModule, Microservices } from 'libs/common';
import { RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: Microservices.ORDERS }),
    RmqModule.register({ name: Microservices.RESTAURANTS }),
    RmqModule.register({ name: Microservices.DELIVERIES }),
    RmqModule.register({ name: Microservices.AUTH }),
    RmqModule.register({ name: Microservices.STATISTICS }),
    AuthModule,
    AuthGatewayModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
