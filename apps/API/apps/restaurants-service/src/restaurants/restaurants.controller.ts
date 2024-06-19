import { Controller, UseFilters } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  RestaurantMessage,
  CreateRestaurantMessage,
  EditRestaurantMessage,
  DeleteRestaurantMessage,
} from 'libs/common'; // Import the missing type
import { UnprocessableEntityExceptionFilter } from 'apps/api-gateway/src/filter/rpc-422-exception.filter';

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.CREATE_RESTAURANT)
  handleRestaurantCreated(data: CreateRestaurantMessage) {
    return this.restaurantsService.createRestaurant(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.EDIT_RESTAURANT)
  handleRestaurantEdited(data: EditRestaurantMessage) {
    return this.restaurantsService.editRestaurant(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.DELETE_RESTAURANT)
  handleRestaurantDeleted(data: DeleteRestaurantMessage) {
    return this.restaurantsService.deleteRestaurant(data);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.GET_RESTAURANT)
  handleRestaurantGot(id: string) {
    return this.restaurantsService.getRestaurant(id);
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.GET_RESTAURANTS)
  handleRestaurantGotAll() {
    return this.restaurantsService.getAllRestaurants();
  }

  @UseFilters(new UnprocessableEntityExceptionFilter())
  @MessagePattern(RestaurantMessage.GET_RESTAURANT_INFOS)
  handleRestaurantInfosGot(id: string) {
    return this.restaurantsService.getRestaurantInfos(id);
  }
}
