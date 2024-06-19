import { Controller, UseFilters } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';
import {
  CreateOrderMessage,
  DeleteOrderMessage,
  EditOrderMessage,
  EditOrderStatusMessage,
  GetOrderMessage,
  GetReceivedOrderMessage,
  GetReceivedOrdersMessage,
  OrderMessage,
} from 'libs/common';
import { User } from '@gen/client/users';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.CREATE_ORDER)
  handleOrderCreated(data: CreateOrderMessage) {
    return this.ordersService.createOrder(data);
  }

  // @UseFilters(new UnprocessableEntityExceptionFilter())
  // @MessagePattern(OrderMessage.EDIT_ORDER)
  // handleOrderEdited(data: EditOrderMessage) {
  //   return this.ordersService.editOrder(data);
  // }

  // @UseFilters(new UnprocessableEntityExceptionFilter())
  // @MessagePattern(OrderMessage.DELETE_ORDER)
  // handleOrderDeleted(data: DeleteOrderMessage) {
  //   return this.ordersService.deleteOrder(data);
  // }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_ORDER)
  handleOrderGot(data: GetOrderMessage) {
    return this.ordersService.getOrder(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_ORDERS)
  handleOrdersGot(userId: string) {
    return this.ordersService.getOrders(userId);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.EDIT_ORDER_STATUS)
  handleOrderStatusEdited(data: EditOrderStatusMessage) {
    return this.ordersService.editOrderStatus(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_RECEIVED_ORDER)
  handleReceivedOrderGot(data: GetReceivedOrderMessage) {
    return this.ordersService.getReceivedOrder(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_RECEIVED_ORDERS)
  handleReceivedOrdersGot(data: GetReceivedOrdersMessage) {
    return this.ordersService.getReceivedOrders(data);
  }
}
