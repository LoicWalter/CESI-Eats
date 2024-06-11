import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRestaurantMessage,
  Microservices,
  RestaurantMessage,
  EditRestaurantMessage,
} from 'libs/common';
import { OrderEvent, CreateOrderEvent } from '@app/common/events';
import { CreateOrderDto, CreateRestaurantDto, EditRestaurantDto } from './dto';
import { firstValueFrom, of } from 'rxjs';
import { join } from 'path';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
  ) {}

  createOrder(createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.ordersService.emit(
        OrderEvent.CREATE_ORDER,
        new CreateOrderEvent(createOrderDto.name, createOrderDto.price, createOrderDto.email),
      ),
    );
  }

  getRestaurantPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/restaurantimages/' + id)));
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    restaurantPicture: Express.Multer.File,
  ) {
    return firstValueFrom(
      this.restaurantsService.send(
        RestaurantMessage.CREATE_RESTAURANT,
        new CreateRestaurantMessage(createRestaurantDto, restaurantPicture?.filename),
      ),
    );
  }

  editRestaurant(id, editRestaurantDto: EditRestaurantDto, restaurantPicture: Express.Multer.File) {
    return firstValueFrom(
      this.restaurantsService.send(
        RestaurantMessage.EDIT_RESTAURANT,
        new EditRestaurantMessage(id, editRestaurantDto, restaurantPicture?.filename),
      ),
    );
  }

  deleteRestaurant(id: string) {
    return firstValueFrom(this.restaurantsService.send(RestaurantMessage.DELETE_RESTAURANT, id));
  }

  async getRestaurant(id: string) {
    const res = await firstValueFrom(
      this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, id),
    );
    if (!res) {
      throw new NotFoundException('Restaurant not found');
    }
  }

  getAllRestaurants() {
    return firstValueFrom(this.restaurantsService.send(RestaurantMessage.GET_RESTAURANTS, {}));
  }
}
