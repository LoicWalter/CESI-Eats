import { Inject, Injectable } from '@nestjs/common';
import { PrismaDeliveriesService } from '@app/databases/deliveries/prisma/prisma-deliveries.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateDeliveryMessage,
  EditDeliveryStatusMessage,
  ErrorsMessages,
  GetAllDeliveryOrdersMessage,
  GetClientOrderMessage,
  GetDeliveryMessage,
  GetReceivedOrderMessage,
  GetReceivedOrdersMessage,
  GetRestaurantDeliveriesMessage,
  GetRestaurantDeliveryMessage,
  Microservices,
  OrderMessage,
  RestaurantMessage,
} from 'libs/common';
import { firstValueFrom } from 'rxjs';
import { User } from '@gen/client/users';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly prisma: PrismaDeliveriesService,
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
  ) {}

  async createDelivery(data: CreateDeliveryMessage) {
    const order = await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_CLIENT_ORDER,
        new GetClientOrderMessage(data.user, data.dto.order),
      ),
    );
    const alreadyExist = await this.prisma.delivery.findFirst({
      where: { order: data.dto.order },
    });
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }

    if (alreadyExist) {
      throw new RpcException(ErrorsMessages.DELIVERY_ALREADY_EXIST);
    }
    console.log('Creating delivery :', data.dto.deliveryAddress);
    return this.prisma.delivery.create({
      data: {
        order: data.dto.order,
        deliveryAddress: data.dto.deliveryAddress,
      },
    });
  }

  async editDeliveryStatus(data: EditDeliveryStatusMessage) {
    if (data.type === 'status') {
      const delivery = await this.prisma.delivery.findUnique({
        where: { id: data.deliveryId },
      });
      const isDeliverer = await this.prisma.delivery.findUnique({
        where: { id: data.deliveryId, deliverer: data.user.id },
      });
      if (!delivery) {
        throw new RpcException(ErrorsMessages.DELIVERY_NOT_FOUND);
      }
      if (!isDeliverer) {
        throw new RpcException(ErrorsMessages.USER_IS_NOT_DELIVERER);
      }
      console.log('Updating delivery :', data);
      return this.prisma.delivery.update({
        where: { id: data.deliveryId },
        data: {
          status: data.status,
        },
      });
    }

    if (data.type === 'accept') {
      const delivery = await this.prisma.delivery.findUnique({
        where: { id: data.deliveryId },
      });
      if (!delivery) {
        throw new RpcException(ErrorsMessages.DELIVERY_NOT_FOUND);
      }
      if (delivery.status) {
        throw new RpcException(ErrorsMessages.DELIVERY_NOT_AVAILABLE);
      }

      const order = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.GET_CLIENT_ORDER,
          new GetClientOrderMessage(data.user, delivery.order),
        ),
      );
      if (order.status === 'COMMANDE_PASSEE') {
        throw new RpcException(ErrorsMessages.ORDER_NOT_AVAILABLE);
      }

      console.log('Accepting delivery :', data.deliveryId);
      return this.prisma.delivery.update({
        where: { id: data.deliveryId },
        data: {
          deliverer: data.user.id,
          deliveryTime: new Date(),
          status: 'LIVRAISON_ACCEPTEE',
        },
      });
    }
  }

  async getDeliveryOrder(data: GetDeliveryMessage) {
    console.log('data:', data);
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: data.deliveryId },
    });
    const isDeliverer = await this.prisma.delivery.findUnique({
      where: { id: data.deliveryId, deliverer: data.user.id },
    });
    console.log('Getting deliverer:', delivery);
    if (!delivery) {
      throw new RpcException(ErrorsMessages.DELIVERY_NOT_FOUND);
    }
    if (!isDeliverer && delivery.deliverer !== null) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_DELIVERER);
    }
    return delivery;
  }

  getAllDeliveredOrders(data: GetAllDeliveryOrdersMessage) {
    if (data.type === 'deliverer') {
      console.log('Getting all delivery');
      return this.prisma.delivery.findMany({
        where: { deliverer: data.user.id },
      });
    }
    if (data.type === 'all') {
      console.log('Getting all orders');
      return this.prisma.delivery.findMany({});
    }
  }

  async getClientDelivery(data: GetDeliveryMessage) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: data.deliveryId },
    });
    if (!delivery) {
      throw new RpcException(ErrorsMessages.DELIVERY_NOT_FOUND);
    }

    const order = await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_CLIENT_ORDER,
        new GetClientOrderMessage(data.user, delivery.order),
      ),
    );
    if (!order) {
      throw new RpcException(ErrorsMessages.CLIENT_NOT_CONCERNED);
    }
    console.log('Getting client delivery :', delivery);
    return delivery;
  }

  async getAllClientDeliveries(user: User) {
    const orders = await firstValueFrom(
      this.ordersService.send(OrderMessage.GET_CLIENT_ORDERS, user.id),
    );
    const deliveries = await this.prisma.delivery.findMany({
      where: { order: { in: orders.map((order) => order.id) } },
    });
    console.log('Getting all client deliveries');
    return deliveries;
  }

  async getRestaurantDelivery(data: GetRestaurantDeliveryMessage) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: data.deliveryId },
    });

    if (!delivery) {
      throw new RpcException(ErrorsMessages.DELIVERY_NOT_FOUND);
    }

    const order = await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_RECEIVED_ORDER,
        new GetReceivedOrderMessage(data.user, data.restaurantId, delivery.order),
      ),
    );

    if (!order) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_CONCERNED);
    }
    console.log('Getting restaurant delivery :', delivery);
    return delivery;
  }

  async getRestaurantDeliveries(data: GetRestaurantDeliveriesMessage) {
    const restaurant = await firstValueFrom(
      this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, data.restaurantId),
    );
    if (restaurant.owner !== data.user.id) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    const orders = await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_RECEIVED_ORDERS,
        new GetReceivedOrdersMessage(data.user, data.restaurantId),
      ),
    );
    const deliveries = await this.prisma.delivery.findMany({
      where: { order: { in: orders.map((order) => order.id) } },
    });
    console.log('Getting restaurant deliveries :', deliveries);
    return deliveries;
  }
}
