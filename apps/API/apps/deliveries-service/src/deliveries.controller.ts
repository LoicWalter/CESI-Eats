import { Controller, UseFilters } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateDeliveryMessage,
  DeliveryMessage,
  EditDeliveryStatusMessage,
  GetAllDeliveryOrdersMessage,
  GetDeliveryMessage,
  GetRestaurantDeliveriesMessage,
  GetRestaurantDeliveryMessage,
} from 'libs/common';
import { User } from '@gen/client/users';

@Controller()
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.CREATE_DELIVERY)
  handleDeliveryCreated(data: CreateDeliveryMessage) {
    return this.deliveriesService.createDelivery(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.EDIT_DELIVERY_STATUS)
  handleDeliveryStatusEdited(data: EditDeliveryStatusMessage) {
    return this.deliveriesService.editDeliveryStatus(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_DELIVERY_ORDER)
  handleDeliveryOrderGot(data: GetDeliveryMessage) {
    return this.deliveriesService.getDeliveryOrder(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_DELIVERY_ORDERS)
  handleDeliveredOrdersGot(data: GetAllDeliveryOrdersMessage) {
    return this.deliveriesService.getAllDeliveredOrders(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_CLIENT_DELIVERY)
  handleClientDeliveryGot(data: GetDeliveryMessage) {
    return this.deliveriesService.getClientDelivery(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_CLIENT_DELIVERIES)
  handleClientDeliveriesGot(user: User) {
    return this.deliveriesService.getAllClientDeliveries(user);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_RESTAURANT_DELIVERY)
  handleRestaurantDeliveryGot(data: GetRestaurantDeliveryMessage) {
    return this.deliveriesService.getRestaurantDelivery(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_RESTAURANT_DELIVERIES)
  handleRestaurantDeliveriesGot(data: GetRestaurantDeliveriesMessage) {
    return this.deliveriesService.getRestaurantDeliveries(data);
  }
}
