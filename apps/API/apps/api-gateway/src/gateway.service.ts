import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Microservices } from 'libs/common';
import { OrderEvent, CreateOrderEvent } from '@app/common/events';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class GatewayService {
  constructor(@Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(createOrderDto: CreateOrderDto) {
    this.ordersService.emit(
      OrderEvent.CREATE_ORDER,
      new CreateOrderEvent(createOrderDto.name, createOrderDto.price, createOrderDto.email),
    );
  }
}
