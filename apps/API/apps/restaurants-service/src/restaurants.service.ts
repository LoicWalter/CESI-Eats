import { PrismaRestaurantsService } from '@app/databases/restaurants/prisma/prisma-restaurants.service';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantMessage } from 'libs/common';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaRestaurantsService) {}

  createRestaurant(data: CreateRestaurantMessage) {
    console.log('Creating restaurant :', data);
    return this.prisma.restaurant.create({
      data: {
        name: data.name,
        owner: data.owner,
        priceRange: data.priceRange,
        currentOffer: data.currentOffer,
        image: data.image,
        phone: data.phone,
        address: data.address,
        siret: data.siret,
        category: data.category,
      },
    });
  }
}
