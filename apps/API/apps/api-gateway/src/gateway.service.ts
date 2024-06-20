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
  OrderMessage,
  CreateOrderMessage,
  // EditOrderMessage,
  // DeleteOrderMessage,
  DeliveryMessage,
  GetReceivedOrderMessage,
  GetReceivedOrdersMessage,
  EditOrderStatusMessage,
  EditDeliveryStatusMessage,
  GetAllDeliveryOrdersMessage,
  CreateDeliveryMessage,
  GetClientOrderMessage,
  StatisticsMessage,
  GetRestaurantOrdersStatsMessage,
  GetDeliveryMessage,
  GetRestaurantDeliveryMessage,
  GetRestaurantDeliveriesMessage,
} from 'libs/common';
import {
  CreateDeliveryDto,
  CreateItemDto,
  CreateMenuDto,
  CreateOrderDto,
  CreateRestaurantDto,
  EditItemDto,
  EditMenuDto,
  // EditOrderDto,
  EditRestaurantDto,
} from './dto';
import { User } from '@gen/client/users';
import { OrderStatus } from '@gen/client/orders';
import { DeliveryStatus } from '@gen/client/deliveries';
import { firstValueFrom, of } from 'rxjs';
import { join } from 'path';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly itemsService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly menusService: ClientProxy,
    @Inject(Microservices.DELIVERIES) private readonly deliveriesService: ClientProxy,
    @Inject(Microservices.STATISTICS) private readonly statisticsService: ClientProxy,
  ) {}

  errorManagement(error: any) {
    if (error.status === 422) {
      console.log('error', error);
      throw new UnprocessableEntityException(error.message);
    }
    console.log(error);
    throw new InternalServerErrorException(error.message);
  }

  //----------------------------------Statistics----------------------------------

  async getOrdersStatistics() {
    try {
      const res = await firstValueFrom(
        this.statisticsService.send(StatisticsMessage.GET_ORDERS_STATS, {}),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getDeliveriesStatistics(type: string) {
    try {
      const res = await firstValueFrom(
        this.statisticsService.send(StatisticsMessage.GET_DELIVERIES_STATS, type),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getRestaurantOrdersStatistics(user: User, restaurantId: string) {
    try {
      const res = await firstValueFrom(
        this.statisticsService.send(
          StatisticsMessage.GET_RESTAURANT_ORDERS_STATS,
          new GetRestaurantOrdersStatsMessage(user, restaurantId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  //----------------------------------Orders----------------------------------

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    try {
      const res = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.CREATE_ORDER,
          new CreateOrderMessage(user, createOrderDto),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  // async editOrder(user: User, orderId: string, editOrderDto: EditOrderDto) {
  //   try {
  //     const res = await firstValueFrom(
  //       this.ordersService.send(
  //         OrderMessage.EDIT_ORDER,
  //         new EditOrderMessage(user, orderId, editOrderDto),
  //       ),
  //     );
  //     return res;
  //   } catch (error) {
  //     this.errorManagement(error);
  //   }
  // }

  // async deleteOrder(user: User, orderId: string) {
  //   try {
  //     const res = await firstValueFrom(
  //       this.ordersService.send(OrderMessage.DELETE_ORDER, new DeleteOrderMessage(user, orderId)),
  //     );
  //     return res;
  //   } catch (error) {
  //     this.errorManagement(error);
  //   }
  // }

  async getClientOrder(user: User, orderId: string) {
    try {
      console.log('user', user);
      console.log('orderId', orderId);
      const res = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.GET_CLIENT_ORDER,
          new GetClientOrderMessage(user, orderId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllClientOrders(userId: string) {
    try {
      const res = await firstValueFrom(
        this.ordersService.send(OrderMessage.GET_CLIENT_ORDERS, userId),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async editOrderStatus(user: User, restaurantId: string, orderId: string, status: OrderStatus) {
    try {
      const res = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.EDIT_ORDER_STATUS,
          new EditOrderStatusMessage(user, restaurantId, orderId, status),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getReceivedOrder(user: User, restaurantId: string, orderId: string) {
    try {
      const res = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.GET_RECEIVED_ORDER,
          new GetReceivedOrderMessage(user, restaurantId, orderId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllReceivedOrders(user: User, restaurantId: string) {
    try {
      const res = await firstValueFrom(
        this.ordersService.send(
          OrderMessage.GET_RECEIVED_ORDERS,
          new GetReceivedOrdersMessage(user, restaurantId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getOrder(orderId: string) {
    try {
      const res = await firstValueFrom(this.ordersService.send(OrderMessage.GET_ORDER, orderId));
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllOrders() {
    try {
      const res = await firstValueFrom(this.ordersService.send(OrderMessage.GET_ORDERS, {}));
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  //----------------------------------Deliveries----------------------------------

  async createDelivery(user: User, createDeliveryDto: CreateDeliveryDto) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.CREATE_DELIVERY,
          new CreateDeliveryMessage(user, createDeliveryDto),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async editDeliveryStatus(user: User, deliveryId: string, status: DeliveryStatus, type: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.EDIT_DELIVERY_STATUS,
          new EditDeliveryStatusMessage(user, deliveryId, type, status),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getDeliveryOrder(user: User, deliveryId: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.GET_DELIVERY_ORDER,
          new GetDeliveryMessage(user, deliveryId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllDeliveryOrders(user: User, type: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.GET_DELIVERY_ORDERS,
          new GetAllDeliveryOrdersMessage(user, type),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getClientDelivery(user: User, deliveryId: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.GET_CLIENT_DELIVERY,
          new GetDeliveryMessage(user, deliveryId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllClientDeliveries(user: User) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(DeliveryMessage.GET_CLIENT_DELIVERIES, user),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getRestaurantDelivery(user: User, restaurantId: string, deliveryId: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.GET_RESTAURANT_DELIVERY,
          new GetRestaurantDeliveryMessage(user, restaurantId, deliveryId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllRestaurantDeliveries(user: User, restaurantId: string) {
    try {
      const res = await firstValueFrom(
        this.deliveriesService.send(
          DeliveryMessage.GET_RESTAURANT_DELIVERIES,
          new GetRestaurantDeliveriesMessage(user, restaurantId),
        ),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
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
      this.errorManagement(error);
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
      this.errorManagement(error);
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
      this.errorManagement(error);
    }
  }

  async getRestaurant(id: string) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT, id),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllRestaurants() {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANTS, {}),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getRestaurantInfos(id: string) {
    try {
      const res = await firstValueFrom(
        this.restaurantsService.send(RestaurantMessage.GET_RESTAURANT_INFOS, id),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
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
      this.errorManagement(error);
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
      this.errorManagement(error);
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
      this.errorManagement(error);
    }
  }

  async getItem(restaurantId: string, itemId: string) {
    try {
      const res = await firstValueFrom(
        this.itemsService.send(ItemMessage.GET_ITEM, new GetItemMessage(restaurantId, itemId)),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllItems(restaurantId: string) {
    try {
      const res = await firstValueFrom(this.itemsService.send(ItemMessage.GET_ITEMS, restaurantId));
      return res;
    } catch (error) {
      this.errorManagement(error);
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
      this.errorManagement(error);
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
      this.errorManagement(error);
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
      this.errorManagement(error);
    }
  }

  async getMenu(restaurantId: string, menuId: string) {
    try {
      const res = await firstValueFrom(
        this.menusService.send(MenuMessage.GET_MENU, new GetMenuMessage(restaurantId, menuId)),
      );
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  async getAllMenus(restaurantId: string) {
    try {
      const res = await firstValueFrom(this.menusService.send(MenuMessage.GET_MENUS, restaurantId));
      return res;
    } catch (error) {
      this.errorManagement(error);
    }
  }

  getMenuPicture(id: string, res: any) {
    return of(res.sendFile(join(process.cwd(), 'uploads/menuimages/' + id)));
  }
}
