import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateItemMessage,
  DeleteItemMessage,
  EditItemMessage,
  ErrorsMessages,
  GetItemMessage,
} from 'libs/common';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  async createItem(data: CreateItemMessage) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    const owner = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
    });
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    if (!owner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Creating item :', data);
    return this.prisma.item.create({
      data: {
        ...data.dto,
        itemPicture: data.itemPicture,
        restaurant: { connect: { id: data.restaurantId } },
      },
    });
  }

  async editItem(data: EditItemMessage) {
    const item = await this.prisma.item.findUnique({
      where: { id: data.itemId, restaurantId: data.restaurantId },
    });
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
    });
    if (!item) {
      throw new RpcException(ErrorsMessages.ITEM_NOT_FOUND);
    }
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Updating item :', data);
    return this.prisma.item.update({
      where: { id: data.itemId },
      data: {
        ...data.dto,
        itemPicture: data.itemPicture,
      },
    });
  }

  async deleteItem(data: DeleteItemMessage) {
    const item = await this.prisma.item.findUnique({
      where: { id: data.itemId, restaurantId: data.restaurantId },
    });
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
    });
    if (!item) {
      throw new RpcException(ErrorsMessages.ITEM_NOT_FOUND);
    }
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Deleting item :', data.itemId);
    return this.prisma.item.delete({ where: { id: data.itemId } });
  }

  async getItem(data: GetItemMessage) {
    const item = await this.prisma.item.findUnique({
      where: { id: data.itemId, restaurantId: data.restaurantId },
    });
    if (!item) {
      throw new RpcException(ErrorsMessages.ITEM_NOT_FOUND);
    }
    console.log('Getting item :', data.itemId);
    return item;
  }

  getAllItems(restaurantId: string) {
    console.log('Getting all items');
    return this.prisma.item.findMany({ where: { restaurantId } });
  }
}
