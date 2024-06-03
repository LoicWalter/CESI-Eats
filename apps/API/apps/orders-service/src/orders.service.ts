import { Injectable } from '@nestjs/common';
import { PrismaOrdersService } from '@app/databases/orders/prisma/prisma-orders.service';
import { CreateOrderEvent } from '@app/common/events';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaOrdersService) {}

  createOrder(data: CreateOrderEvent) {
    console.log('Creating order :', data);
    return this.prisma.order.create({
      data: {
        name: data.name,
        price: data.price,
        email: data.email,
      },
    });
  }
}
