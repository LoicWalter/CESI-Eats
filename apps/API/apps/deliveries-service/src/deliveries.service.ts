import { Inject, Injectable } from '@nestjs/common';
import { PrismaDeliveriesService } from '@app/databases/deliveries/prisma/prisma-deliveries.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateDeliveryMessage,
  EditDeliveryStatusMessage,
  ErrorsMessages,
  GetAllDeliveryOrdersMessage,
  GetClientOrderMessage,
  GetDeliveryOrderMessage,
  Microservices,
  OrderMessage,
} from 'libs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly prisma: PrismaDeliveriesService,
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
  ) {}

  async createDelivery(data: CreateDeliveryMessage) {
    const order = await firstValueFrom(
      this.ordersService.send(
        OrderMessage.GET_ORDER,
        new GetClientOrderMessage(data.user, data.dto.order),
      ),
    );
    const alreadyExist = await this.prisma.delivery.findFirst({
      where: { order: data.dto.order },
    });
    if (!order) {
      throw new RpcException(ErrorsMessages.ORDER_NOT_FOUND);
    }
    if (order.status === 'COMMANDE_PASSEE') {
      throw new RpcException(ErrorsMessages.ORDER_NOT_AVAILABLE);
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

  async getDeliveryOrder(data: GetDeliveryOrderMessage) {
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
}
