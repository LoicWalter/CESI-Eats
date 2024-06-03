import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateOrderEvent, OrderEvent } from '@app/common/events';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern(OrderEvent.CREATE_ORDER)
  async handleOrderCreated(data: CreateOrderEvent) {
    return this.ordersService.createOrder(data);
  }
}
