import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  DeliveryMessage,
  GetAllDeliveryOrdersMessage,
  GetReceivedOrdersMessage,
  GetRestaurantOrdersStatsMessage,
  Microservices,
  OrderMessage,
} from 'libs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
    @Inject(Microservices.DELIVERIES) private readonly deliveriesService: ClientProxy,
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
  ) {}

  async getOrdersStats() {
    return await firstValueFrom(this.ordersService.send(OrderMessage.GET_ORDERS, {}));
  }

  async getDeliveriesStats(type: string) {
    return await firstValueFrom(
      this.deliveriesService.send(
        DeliveryMessage.GET_DELIVERY_ORDERS,
        new GetAllDeliveryOrdersMessage(null, type),
      ),
    );
  }

  async getRestaurantOrdersStats(data: GetRestaurantOrdersStatsMessage) {
    return await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_RECEIVED_ORDERS,
        new GetReceivedOrdersMessage(data.user, data.restaurantId),
      ),
    );
  }
}
