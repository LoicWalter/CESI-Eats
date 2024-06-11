import { Controller } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { MessagePattern } from '@nestjs/microservices';
import { RestaurantMessage, CreateRestaurantMessage, EditRestaurantMessage } from 'libs/common'; // Import the missing type

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @MessagePattern(RestaurantMessage.CREATE_RESTAURANT)
  handleRestaurantCreated(data: CreateRestaurantMessage) {
    return this.restaurantsService.createRestaurant(data);
  }

  @MessagePattern(RestaurantMessage.EDIT_RESTAURANT)
  handleRestaurantEdited(data: EditRestaurantMessage) {
    return this.restaurantsService.editRestaurant(data);
  }

  @MessagePattern(RestaurantMessage.DELETE_RESTAURANT)
  handleRestaurantDeleted(id: string) {
    return this.restaurantsService.deleteRestaurant(id);
  }

  @MessagePattern(RestaurantMessage.GET_RESTAURANT)
  handleRestaurantGot(id: string) {
    return this.restaurantsService.getRestaurant(id);
  }

  @MessagePattern(RestaurantMessage.GET_RESTAURANTS)
  handleRestaurantGotAll() {
    return this.restaurantsService.getAllRestaurants();
  }
}
