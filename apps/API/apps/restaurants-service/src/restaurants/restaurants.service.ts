import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateRestaurantMessage,
  DeleteRestaurantMessage,
  EditRestaurantMessage,
  ErrorsMessages,
} from 'libs/common';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  createRestaurant(data: CreateRestaurantMessage) {
    console.log('Creating restaurant :', data);
    return this.prisma.restaurant.create({
      data: {
        ...data.dto,
        owner: data.user.id,
        restaurantPicture: data.restaurantPicture,
      },
    });
  }

  async editRestaurant(data: EditRestaurantMessage) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id: data.id },
    });
    const owner = await this.prisma.restaurant.findFirst({
      where: { id: data.id, owner: data.user.id },
    });
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    if (!owner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Updating restaurant :', data);
    return this.prisma.restaurant.update({
      where: { id: data.id },
      data: {
        ...data.dto,
        restaurantPicture: data.restaurantPicture,
      },
    });
  }

  async deleteRestaurant(data: DeleteRestaurantMessage) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.id },
    });
    const owner = await this.prisma.restaurant.findUnique({
      where: { id: data.id, owner: data.user.id },
    });
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    if (!owner) {
      throw new RpcException(ErrorsMessages.USER_IS_NOT_OWNER);
    }
    console.log('Deleting restaurant :', data.id);
    return this.prisma.restaurant.delete({ where: { id: data.id } });
  }

  async getRestaurant(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    console.log('Getting restaurant :', id);
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  getAllRestaurants() {
    console.log('Getting all restaurants');
    return this.prisma.restaurant.findMany();
  }

  async getRestaurantInfos(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new RpcException(ErrorsMessages.RESTAURANT_NOT_FOUND);
    }
    console.log('Getting restaurant infos :', id);
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        items: true,
        menus: true,
      },
    });
  }
}
