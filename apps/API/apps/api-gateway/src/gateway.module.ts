import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from './constants/microservices-name';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Microservices.USERS,
        transport: Transport.TCP,
      },
      {
        name: Microservices.ORDERS,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
