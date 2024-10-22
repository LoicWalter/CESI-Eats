import { Controller, UseFilters } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';
import {
  CreateOrderMessage,
  DeleteOrderMessage,
  EditOrderMessage,
  EditOrderStatusMessage,
  GetClientOrderMessage,
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
  @MessagePattern(OrderMessage.GET_CLIENT_ORDER)
  handleClientOrderGot(data: GetClientOrderMessage) {
    return this.ordersService.getClientOrder(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_CLIENT_ORDERS)
  handleClientOrdersGot(userId: string) {
    return this.ordersService.getClientOrders(userId);
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

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_ORDER)
  handleOrderGot(orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(OrderMessage.GET_ORDERS)
  handleOrdersGot() {
    return this.ordersService.getOrders();
  }
}
