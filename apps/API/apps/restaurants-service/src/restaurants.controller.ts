import { Controller } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { MessagePattern } from '@nestjs/microservices';
import { RestaurantMessage, CreateRestaurantMessage } from 'libs/common'; // Import the missing type

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @MessagePattern(RestaurantMessage.CREATE_RESTAURANT)
  async handleRestaurantCreated(data: CreateRestaurantMessage) {
    return this.restaurantsService.createRestaurant(data);
  }
}
