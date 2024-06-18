import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
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

  private readonly logger = new Logger(GatewayService.name);

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
    this.logger.log(`User ${user.id} is creating a restaurant`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.CREATE_RESTAURANT,
          new CreateRestaurantMessage(user, createRestaurantDto, restaurantPicture?.filename),
        ),
      );
      this.logger.log(`Restaurant ${res.id} created`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while creating a restaurant for user ${user.id} : ${error.message}`,
      );
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
    this.logger.log(`User ${user.id} is editing restaurant ${id}`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.EDIT_RESTAURANT,
          new EditRestaurantMessage(user, id, editRestaurantDto, restaurantPicture?.filename),
        ),
      );
      this.logger.log(`Restaurant ${res.id} edited`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while editing restaurant ${id} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteRestaurant(user: User, id: string) {
    this.logger.log(`User ${user.id} is deleting restaurant ${id}`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(
          RestaurantMessage.DELETE_RESTAURANT,
          new DeleteRestaurantMessage(user, id),
        ),
      );
      this.logger.log(`Restaurant ${id} deleted`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while deleting restaurant ${id} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRestaurant(id: string) {
    this.logger.log(`Getting restaurant ${id}`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, id),
      );
      this.logger.log(`Restaurant ${id} fetched`);
      return res;
    } catch (error) {
      this.logger.error(`An error occured while fetching restaurant ${id} : ${error.message}`);
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllRestaurants() {
    this.logger.log(`Getting all restaurants`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANTS, {}),
      );
      this.logger.log(`All restaurants fetched`);
      return res;
    } catch (error) {
      if (error.status === 422) {
        this.logger.error(`An error occured while fetching all restaurants : ${error.message}`);
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRestaurantInfos(id: string) {
    this.logger.log(`Getting restaurant infos for restaurant ${id}`);
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT_INFOS, id),
      );
      this.logger.log(`Restaurant infos for restaurant ${id} fetched`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while fetching restaurant infos for restaurant ${id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getRestaurantPicture(id: string, res: any) {
    this.logger.log(`Getting restaurant picture for restaurant ${id}`);
    return of(res.sendFile(join(process.cwd(), 'uploads/restaurantimages/' + id)));
  }

  //----------------------------------Items----------------------------------

  async createItem(
    user: User,
    restaurantId: string,
    createItemDto: CreateItemDto,
    itemPicture: Express.Multer.File,
  ) {
    this.logger.log(`User ${user.id} is creating an item for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.CREATE_ITEM,
          new CreateItemMessage(user, restaurantId, createItemDto, itemPicture?.filename),
        ),
      );
      this.logger.log(`Item ${res.id} created for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while creating an item for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
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
    this.logger.log(`User ${user.id} is editing item ${itemId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.EDIT_ITEM,
          new EditItemMessage(user, restaurantId, itemId, editItemDto, itemPicture?.filename),
        ),
      );
      this.logger.log(`Item ${res.id} edited for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while editing item ${itemId} for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteItem(user: User, restaurantId: string, itemId: string) {
    this.logger.log(`User ${user.id} is deleting item ${itemId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.itemsService.send(
          ItemMessage.DELETE_ITEM,
          new DeleteItemMessage(user, restaurantId, itemId),
        ),
      );
      this.logger.log(`Item ${itemId} deleted for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while deleting item ${itemId} for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItem(restaurantId: string, itemId: string) {
    this.logger.log(`Getting item ${itemId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.itemsService.send(ItemMessage.GET_ITEM, new GetItemMessage(restaurantId, itemId)),
      );
      this.logger.log(`Item ${itemId} fetched for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while fetching item ${itemId} for restaurant ${restaurantId} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllItems(restaurantId: string) {
    this.logger.log(`Getting all items for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(this.itemsService.send(ItemMessage.GET_ITEMS, restaurantId));
      this.logger.log(`All items fetched for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while fetching all items for restaurant ${restaurantId} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getItemPicture(id: string, res: any) {
    this.logger.log(`Getting item picture for item ${id}`);
    return of(res.sendFile(join(process.cwd(), 'uploads/itemimages/' + id)));
  }

  //----------------------------------Menus----------------------------------

  async createMenu(
    user: User,
    restaurantId: string,
    createMenuDto: CreateMenuDto,
    menuPicture: Express.Multer.File,
  ) {
    this.logger.log(`User ${user.id} is creating a menu for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.CREATE_MENU,
          new CreateMenuMessage(user, restaurantId, createMenuDto, menuPicture?.filename),
        ),
      );
      this.logger.log(`Menu ${res.id} created for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while creating a menu for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
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
    this.logger.log(`User ${user.id} is editing menu ${menuId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.EDIT_MENU,
          new EditMenuMessage(user, restaurantId, menuId, editMenuDto, menuPicture?.filename),
        ),
      );
      this.logger.log(`Menu ${res.id} edited for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while editing menu ${menuId} for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteMenu(user: User, restaurantId: string, menuId: string) {
    this.logger.log(`User ${user.id} is deleting menu ${menuId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.menusService.send(
          MenuMessage.DELETE_MENU,
          new DeleteMenuMessage(user, restaurantId, menuId),
        ),
      );
      this.logger.log(`Menu ${menuId} deleted for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while deleting menu ${menuId} for restaurant ${restaurantId} for user ${user.id} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getMenu(restaurantId: string, menuId: string) {
    this.logger.log(`Getting menu ${menuId} for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(
        this.menusService.send(MenuMessage.GET_MENU, new GetMenuMessage(restaurantId, menuId)),
      );
      this.logger.log(`Menu ${menuId} fetched for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while fetching menu ${menuId} for restaurant ${restaurantId} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllMenus(restaurantId: string) {
    this.logger.log(`Getting all menus for restaurant ${restaurantId}`);
    try {
      const res = await firstValueFrom(this.menusService.send(MenuMessage.GET_MENUS, restaurantId));
      this.logger.log(`All menus fetched for restaurant ${restaurantId}`);
      return res;
    } catch (error) {
      this.logger.error(
        `An error occured while fetching all menus for restaurant ${restaurantId} : ${error.message}`,
      );
      if (error.status === 422) {
        console.log('error', error);
        throw new UnprocessableEntityException(error.message);
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  getMenuPicture(id: string, res: any) {
    this.logger.log(`Getting menu picture for menu ${id}`);
    return of(res.sendFile(join(process.cwd(), 'uploads/menuimages/' + id)));
  }
}
