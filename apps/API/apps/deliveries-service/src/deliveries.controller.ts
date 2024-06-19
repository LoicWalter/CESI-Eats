import { Controller, UseFilters } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateDeliveryMessage,
  DeliveryMessage,
  EditDeliveryStatusMessage,
  GetAllDeliveryOrdersMessage,
  GetDeliveryOrderMessage,
} from 'libs/common';

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
  handleDeliveryOrderGot(data: GetDeliveryOrderMessage) {
    return this.deliveriesService.getDeliveryOrder(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(DeliveryMessage.GET_DELIVERY_ORDERS)
  handleDeliveredOrdersGot(data: GetAllDeliveryOrdersMessage) {
    return this.deliveriesService.getAllDeliveredOrders(data);
  }
}
