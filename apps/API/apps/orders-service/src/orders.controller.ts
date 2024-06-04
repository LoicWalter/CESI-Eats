import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderEvent, OrderEvent } from '@app/common/events';
import { RmqService } from 'libs/common';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(OrderEvent.CREATE_ORDER)
  async handleOrderCreated(@Payload() data: CreateOrderEvent, @Ctx() context: RmqContext) {
    this.ordersService.createOrder(data);
    this.rmqService.ack(context);
  }
}
