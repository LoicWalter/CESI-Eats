import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantMessage, EditRestaurantMessage } from 'libs/common';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  createRestaurant(data: CreateRestaurantMessage) {
    console.log('Creating restaurant :', data);
    return this.prisma.restaurant.create({
      data: {
        ...data.dto,
        restaurantPicture: data.restaurantPicture,
      },
    });
  }

  editRestaurant(data: EditRestaurantMessage) {
    console.log('Updating restaurant :', data);
    return this.prisma.restaurant.update({
      where: { id: data.id },
      data: {
        ...data.dto,
        restaurantPicture: data.restaurantPicture,
      },
    });
  }

  deleteRestaurant(id: string) {
    console.log('Deleting restaurant :', id);
    return this.prisma.restaurant.delete({ where: { id } });
  }

  getRestaurant(id: string) {
    console.log('Getting restaurant :', id);
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  getAllRestaurants() {
    console.log('Getting all restaurants');
    return this.prisma.restaurant.findMany();
  }
}
