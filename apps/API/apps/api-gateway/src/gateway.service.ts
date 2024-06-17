import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRestaurantMessage,
  Microservices,
  RestaurantMessage,
  EditRestaurantMessage,
  ItemMessage,
  CreateItemMessage,
  EditItemMessage,
  DeleteItemMessage,
  MenuMessage,
  CreateMenuMessage,
  EditMenuMessage,
  GetItemMessage,
  DeleteRestaurantMessage,
  DeleteMenuMessage,
  GetMenuMessage,
} from 'libs/common';
import { OrderEvent, CreateOrderEvent } from '@app/common/events';
import {
  CreateItemDto,
  CreateMenuDto,
  CreateOrderDto,
  CreateRestaurantDto,
  EditItemDto,
  EditMenuDto,
  EditRestaurantDto,
} from './dto';
import { User } from '@gen/client/users';
import { firstValueFrom, of } from 'rxjs';
import { join } from 'path';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly itemsService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly menusService: ClientProxy,
  ) {}

  //----------------------------------Orders----------------------------------

  createOrder(createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.ordersService.emit(
        OrderEvent.CREATE_ORDER,
        new CreateOrderEvent(createOrderDto.name, createOrderDto.price, createOrderDto.email),
      ),
    );
  }

  //----------------------------------Restaurants----------------------------------

  async createRestaurant(
    user: User,
    createRestaurantDto: CreateRestaurantDto,
    restaurantPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.CREATE_RESTAURANT,
          new CreateRestaurantMessage(user, createRestaurantDto, restaurantPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async editRestaurant(
    user: User,
    id: string,
    editRestaurantDto: EditRestaurantDto,
    restaurantPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.EDIT_RESTAURANT,
          new EditRestaurantMessage(user, id, editRestaurantDto, restaurantPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteRestaurant(user: User, id: string) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.DELETE_RESTAURANT,
          new DeleteRestaurantMessage(user, id),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRestaurant(id: string) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, id),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllRestaurants() {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANTS, {}),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRestaurantInfos(id: string) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT_INFOS, id),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getRestaurantPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/restaurantimages/' + id)));
  }

  //----------------------------------Items----------------------------------

  async createItem(
    user: User,
    restaurantId: string,
    createItemDto: CreateItemDto,
    itemPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.CREATE_ITEM,
          new CreateItemMessage(user, restaurantId, createItemDto, itemPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async editItem(
    user: User,
    restaurantId: string,
    itemId: string,
    editItemDto: EditItemDto,
    itemPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.EDIT_ITEM,
          new EditItemMessage(user, restaurantId, itemId, editItemDto, itemPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteItem(user: User, restaurantId: string, itemId: string) {
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.DELETE_ITEM,
          new DeleteItemMessage(user, restaurantId, itemId),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItem(restaurantId: string, itemId: string) {
    try {
      const res = await firstValueFrom(
        this.itemsService.send(ItemMessage.GET_ITEM, new GetItemMessage(restaurantId, itemId)),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllItems(restaurantId: string) {
    try {
      const res = await firstValueFrom(this.itemsService.send(ItemMessage.GET_ITEMS, restaurantId));
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getItemPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/itemimages/' + id)));
  }

  //----------------------------------Menus----------------------------------

  async createMenu(
    user: User,
    restaurantId: string,
    createMenuDto: CreateMenuDto,
    menuPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.CREATE_MENU,
          new CreateMenuMessage(user, restaurantId, createMenuDto, menuPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async editMenu(
    user: User,
    restaurantId: string,
    menuId: string,
    editMenuDto: EditMenuDto,
    menuPicture: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.EDIT_MENU,
          new EditMenuMessage(user, restaurantId, menuId, editMenuDto, menuPicture?.filename),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteMenu(user: User, restaurantId: string, menuId: string) {
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.DELETE_MENU,
          new DeleteMenuMessage(user, restaurantId, menuId),
        ),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMenu(restaurantId: string, menuId: string) {
    try {
      const res = await firstValueFrom(
        this.menusService.send(MenuMessage.GET_MENU, new GetMenuMessage(restaurantId, menuId)),
      );
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllMenus(restaurantId: string) {
    try {
      const res = await firstValueFrom(this.menusService.send(MenuMessage.GET_MENUS, restaurantId));
      return res;
    } catch (error) {
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getMenuPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/menuimages/' + id)));
  }
}
