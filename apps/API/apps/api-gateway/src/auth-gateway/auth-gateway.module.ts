import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { AuthGatewayController } from './auth-gateway.controller';
import { Microservices, RmqModule } from 'libs/common';

@Module({
  imports: [RmqModule.register({ name: Microservices.AUTH })],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
