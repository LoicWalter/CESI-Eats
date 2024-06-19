import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateMenuMessage,
  DeleteMenuMessage,
  EditMenuMessage,
  ErrorsMessages,
  GetMenuMessage,
} from 'libs/common';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  async createMenu(data: CreateMenuMessage) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId },
      include: { items: true },
    });
    const owner = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
    });
    const allItemsExist = data.dto.itemIDs.every(
      (itemID) => restaurant.items.find((item: { id: string }) => item.id === itemID) !== undefined,
    );
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    if (!owner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    if (!allItemsExist) throw new RpcException(ErrorsMessages.ONE_OR_MORE_ITEMS_NOT_FOUND);
    console.log('Creating menu :', data);
    const { itemIDs, ...rest } = data.dto;
    return this.prisma.menu.create({
      data: {
        ...rest,
        items: { connect: itemIDs.map((id) => ({ id })) },
        menuPicture: data.menuPicture,
        restaurant: { connect: { id: data.restaurantId } },
      },
    });
  }

  async editMenu(data: EditMenuMessage) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: data.menuId, restaurantId: data.restaurantId },
    });
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
      include: { items: true },
    });
    const allItemsExist = data.dto.itemIDs.every(
      (itemID) => restaurant.items.find((item: { id: string }) => item.id === itemID) !== undefined,
    );
    if (!menu) {
      throw new RpcException(ErrorsMessages.MENU_NOT_FOUND);
    }
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    if (!allItemsExist) throw new RpcException(ErrorsMessages.ONE_OR_MORE_ITEMS_NOT_FOUND);
    console.log('Updating menu :', data);
    const { itemIDs, ...rest } = data.dto;
    return this.prisma.menu.update({
      where: { id: data.menuId },
      data: {
        ...rest,
        items: { set: itemIDs.map((id) => ({ id })) },
        menuPicture: data.menuPicture,
      },
    });
  }

  async deleteMenu(data: DeleteMenuMessage) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: data.menuId, restaurantId: data.restaurantId },
    });
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId, owner: data.user.id },
    });
    if (!menu) {
      throw new RpcException(ErrorsMessages.MENU_NOT_FOUND);
    }
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Deleting menu :', data.menuId);
    return this.prisma.menu.delete({ where: { id: data.menuId } });
  }

  async getMenu(data: GetMenuMessage) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: data.menuId, restaurantId: data.restaurantId },
    });
    if (!menu) {
      throw new RpcException(ErrorsMessages.MENU_NOT_FOUND);
    }
    console.log('Getting menu :', data.menuId);
    return menu;
  }

  getAllMenus(restaurantId: string) {
    console.log('Getting all menus');
    return this.prisma.menu.findMany({ where: { restaurantId } });
  }
}
