import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRestaurantMessage,
  Microservices,
  RestaurantMessage,
  EditRestaurantMessage,
  ItemMessage,
  CreateItemMessage,
  EditItemMessage,
} from 'libs/common';
import { OrderEvent, CreateOrderEvent } from '@app/common/events';
import {
  CreateItemDto,
  CreateOrderDto,
  CreateRestaurantDto,
  EditItemDto,
  EditRestaurantDto,
} from './dto';
import { firstValueFrom, of } from 'rxjs';
import { join } from 'path';
import e from 'express';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly itemsService: ClientProxy,
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
    } else {
      return res;
    }
  }

  getAllRestaurants() {
    return firstValueFrom(this.restaurantsService.send(RestaurantMessage.GET_RESTAURANTS, {}));
  }

  getItemPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/itemimages/' + id)));
  }

  createItem(createItemDto: CreateItemDto, itemPicture: Express.Multer.File) {
    return firstValueFrom(
      this.itemsService.send(
        ItemMessage.CREATE_ITEM,
        new CreateItemMessage(createItemDto, itemPicture?.filename),
      ),
    );
  }

  editItem(id, editItemDto: EditItemDto, itemPicture: Express.Multer.File) {
    return firstValueFrom(
      this.itemsService.send(
        ItemMessage.EDIT_ITEM,
        new EditItemMessage(id, editItemDto, itemPicture?.filename),
      ),
    );
  }

  deleteItem(id: string) {
    return firstValueFrom(this.itemsService.send(ItemMessage.DELETE_ITEM, id));
  }

  async getItem(id: string) {
    const res = await firstValueFrom(this.itemsService.send(ItemMessage.GET_ITEM, id));
    if (!res) {
      throw new NotFoundException('Item not found');
    } else {
      return res;
    }
  }

  getAllItems() {
    return firstValueFrom(this.itemsService.send(ItemMessage.GET_ITEMS, {}));
  }
}
