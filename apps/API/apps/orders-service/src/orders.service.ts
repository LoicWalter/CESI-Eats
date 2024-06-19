import { Inject, Injectable } from '@nestjs/common';
import { PrismaOrdersService } from '@app/databases/orders/prisma/prisma-orders.service';
import {
  CreateOrderMessage,
  DeleteOrderMessage,
  EditOrderMessage,
  EditOrderStatusMessage,
  ErrorsMessages,
  GetClientOrderMessage,
  GetReceivedOrderMessage,
  GetReceivedOrdersMessage,
  Microservices,
  RestaurantMessage,
} from 'libs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderStatus } from '@gen/client/orders';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaOrdersService,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
  ) {}

  async createOrder(data: CreateOrderMessage) {
    const restaurant = await firstValueFrom(
      this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT_INFOS, data.dto.restaurant),
    );

    if (data.dto.items) {
      const allItemsExist = data.dto.items.every(
        (itemID) =>
          restaurant.items.find((item: { id: string }) => item.id === itemID) !== undefined,
      );

      if (!allItemsExist) throw new RpcException(ErrorsMessages.ONE_OR_MORE_ITEMS_NOT_FOUND);
    }

    if (data.dto.menus) {
      const allMenusExist = data.dto.menus.every(
        (menuID) =>
          restaurant.menus.find((menu: { id: string }) => menu.id === menuID) !== undefined,
      );
      if (!allMenusExist) throw new RpcException(ErrorsMessages.ONE_OR_MORE_MENUS_NOT_FOUND);
    }

    if (!data.dto.menus && !data.dto.items) {
      throw new RpcException(ErrorsMessages.NO_ITEMS_OR_MENUS);
    }

    console.log('Creating order :', data.dto);
    return this.prisma.order.create({
      data: {
        ...data.dto,
        client: data.user.id,
        status: OrderStatus.COMMANDE_PASSEE,
      },
    });
  }

  // async editOrder(data: EditOrderMessage) {
  //   const order = await this.prisma.order.findUnique({
  //     where: { id: data.id, client: data.user.id },
  //   });
  //   console.log('Order :', order);
  //   if (!order) {
  //     throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
  //   }
  //   console.log('Order :', order);
  //   const notAcceptedStatus = await this.prisma.order.findUnique({
  //     where: { id: data.id, status: 'COMMANDE_PASSEE' },
  //   });

  //   if (!notAcceptedStatus) {
  //     throw new RpcException(ErrorsMessages.ORDER_STATUS_ALREADY_ACCEPTED);
  //   }

  //   const restaurant = await firstValueFrom(
  //     this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT_INFOS, order.restaurant),
  //   );
  //   const allItemsExist = data.dto.items.every(
  //     (itemID) => restaurant.items.find((item: { id: string }) => item.id === itemID) !== undefined,
  //   );

  //   if (!allItemsExist) throw new RpcException(ErrorsMessages.ONE_OR_MORE_ITEMS_NOT_FOUND);

  //   console.log('Updating order :', data);
  //   return this.prisma.order.update({
  //     where: { id: data.id },
  //     data: {
  //       ...data.dto,
  //     },
  //   });
  // }

  // async deleteOrder(data: DeleteOrderMessage) {
  //   const order = await this.prisma.order.findUnique({
  //     where: { id: data.orderId, client: data.user.id },
  //   });
  //   const notAcceptedStatus = await this.prisma.order.findUnique({
  //     where: { id: data.orderId, status: OrderStatus.COMMANDE_PASSEE },
  //   });
  //   if (!order) {
  //     throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
  //   }
  //   if (!notAcceptedStatus) {
  //     throw new RpcException(ErrorsMessages.ORDER_STATUS_ALREADY_ACCEPTED);
  //   }
  //   console.log('Deleting order :', data);
  //   return this.prisma.order.delete({
  //     where: { id: data.orderId },
  //   });
  // }

  async getClientOrder(data: GetClientOrderMessage) {
    console.log('Client :', data);
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId, client: data.user.id },
    });
    console.log('Order :', order);
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }
    console.log('Getting order :', data.orderId);
    return order;
  }

  getClientOrders(userId: string) {
    console.log('Getting orders from user :', userId);
    return this.prisma.order.findMany({
      where: { client: userId },
    });
  }

  async editOrderStatus(data: EditOrderStatusMessage) {
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId },
    });
    const isOwner =
      (
        await firstValueFrom(
          this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, data.restaurantId),
        )
      ).owner === data.user.id;
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }
    if (!isOwner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Updating order status :', data.status);
    return this.prisma.order.update({
      where: { id: data.orderId },
      data: {
        status: data.status,
      },
    });
  }

  async getReceivedOrder(data: GetReceivedOrderMessage) {
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId },
    });
    const isOwner =
      (
        await firstValueFrom(
          this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, data.restaurantId),
        )
      ).owner === data.user.id;
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }
    if (!isOwner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Getting received order :', data);
    return order;
  }

  async getReceivedOrders(data: GetReceivedOrdersMessage) {
    const isOwner =
      (
        await firstValueFrom(
          this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, data.restaurantId),
        )
      ).owner === data.user.id;
    if (!isOwner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Getting received orders :', data);
    return this.prisma.order.findMany({
      where: { restaurant: data.restaurantId },
    });
  }

  async getOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }

    console.log('Getting order :', orderId);
    return order;
  }

  async getOrders() {
    console.log('Getting all orders');
    return this.prisma.order.findMany();
  }
}
