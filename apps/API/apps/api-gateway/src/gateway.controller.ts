import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {
  CreateDeliveryDto,
  CreateItemDto,
  CreateMenuDto,
  CreateOrderDto,
  CreateRestaurantDto,
  EditDeliveryStatusDto,
  EditItemDto,
  EditMenuDto,
  // EditOrderDto,
  EditRestaurantDto,
} from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ApiKeyGuard,
  CurrentUser,
  JwtAuthGuard,
  ProfileFileValidationPipe,
  Roles,
  RolesGuard,
} from 'libs/common';
import { User } from '@gen/client/users';
import { OrderStatus } from '@gen/client/orders';
import { DeliveryStatus } from '@gen/client/deliveries';
import { Role } from '@gen/client/users';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const restaurantStorage = {
  storage: diskStorage({
    destination: 'uploads/restaurantimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

export const itemStorage = {
  storage: diskStorage({
    destination: 'uploads/itemimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

export const menuStorage = {
  storage: diskStorage({
    destination: 'uploads/menuimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller()
// @UseGuards(RolesGuard)
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  private mapOrderStatusToEnum(status: string) {
    switch (status) {
      case 'COMMANDE_PASSEE':
        return OrderStatus.COMMANDE_PASSEE;
      case 'COMMANDE_ACCEPTEE':
        return OrderStatus.COMMANDE_ACCEPTEE;
      case 'PREPARATION_EN_COURS':
        return OrderStatus.PREPARATION_EN_COURS;
      case 'COMMANDE_PRETE':
        return OrderStatus.COMMANDE_PRETE;
      default:
        throw new Error(`Invalid status value: ${status}`);
    }
  }

  private mapDeliveryStatusToEnum(status: string): DeliveryStatus {
    switch (status) {
      case 'LIVRAISON_ACCEPTEE':
        return DeliveryStatus.LIVRAISON_ACCEPTEE;
      case 'LIVREUR_EN_ROUTE_VERS_RESTAURANT':
        return DeliveryStatus.LIVREUR_EN_ROUTE_VERS_RESTAURANT;
      case 'COMMANDE_RECUPEREE':
        return DeliveryStatus.COMMANDE_RECUPEREE;
      case 'LIVREUR_EN_ROUTE_VERS_CLIENT':
        return DeliveryStatus.LIVREUR_EN_ROUTE_VERS_CLIENT;
      case 'COMMANDE_LIVREE':
        return DeliveryStatus.COMMANDE_LIVREE;
      default:
        throw new Error(`Invalid status value: ${status}`);
    }
  }

  //-------------------------------Statistic--------------------------------

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('admin/statistics/orders')
  getOrdersStatistics() {
    return this.gatewayService.getOrdersStatistics();
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('admin/statistics/deliveries')
  getDeliveriesStatistics() {
    const type = 'all';
    return this.gatewayService.getDeliveriesStatistics(type);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('restaurants/:restaurantId/statistics/orders')
  getRestaurantOrdersStatistics(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.gatewayService.getRestaurantOrdersStatistics(user, restaurantId);
  }

  //-------------------------------Order--------------------------------

  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Post('/orders')
  createOrder(@CurrentUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.gatewayService.createOrder(user, createOrderDto);
  }

  // @ApiBody({ type: EditOrderDto })
  // @HttpCode(HttpStatus.OK)
  // // @Roles(Role.CLIENT)
  // @Patch('/orders/:id')
  // editOrder(
  //   @CurrentUser() user: User,
  //   @Param('id') id: string,
  //   @Body() editOrderDto: EditOrderDto,
  // ) {
  //   return this.gatewayService.editOrder(user, id, editOrderDto);
  // }

  // @HttpCode(HttpStatus.OK)
  // // @Roles(Role.CLIENT)
  // @Delete('/orders/:id')
  // deleteOrder(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.gatewayService.deleteOrder(user, id);
  // }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/orders/:id')
  getClientOrder(@CurrentUser() user: User, @Param('id') id: string) {
    return this.gatewayService.getClientOrder(user, id);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/orders')
  getAllClientOrders(@CurrentUser() user: User) {
    return this.gatewayService.getAllClientOrders(user.id);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Patch('/restaurants/:restaurantId/orders/:orderId')
  editOrderStatus(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('orderId') orderId: string,
    @Body() { status }: { status: string },
  ) {
    console.log('status', status);
    const statusEnum = this.mapOrderStatusToEnum(status);
    console.log('statusEnum', statusEnum);
    return this.gatewayService.editOrderStatus(user, restaurantId, orderId, statusEnum);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/restaurants/:restaurantId/orders/:orderId')
  getReceivedOrder(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.gatewayService.getReceivedOrder(user, restaurantId, orderId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/restaurants/:restaurantId/orders')
  getAllReceivedOrders(@CurrentUser() user: User, @Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllReceivedOrders(user, restaurantId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('admin/orders/:orderId')
  getOrder(@Param('orderId') orderId: string) {
    return this.gatewayService.getOrder(orderId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('admin/orders')
  getAllOrders() {
    return this.gatewayService.getAllOrders();
  }

  //-------------------------------Delivery--------------------------------

  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Post('/deliveries')
  createDelivery(@CurrentUser() user: User, @Body() createDeliveryDto: CreateDeliveryDto) {
    return this.gatewayService.createDelivery(user, createDeliveryDto);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.LIVREUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Patch('/deliveries/:deliveryId')
  editDeliveryStatus(
    @CurrentUser() user: User,
    @Param('deliveryId') deliveryId: string,
    @Body() editDeliveryStatusDto: EditDeliveryStatusDto,
    @Query('type') type: string,
  ) {
    let statusEnum = null;
    if (editDeliveryStatusDto.status) {
      statusEnum = this.mapDeliveryStatusToEnum(editDeliveryStatusDto.status);
    }
    return this.gatewayService.editDeliveryStatus(user, deliveryId, statusEnum, type);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.LIVREUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/deliveries/:deliveryId')
  getDeliveryOrder(@CurrentUser() user: User, @Param('deliveryId') deliveryId: string) {
    return this.gatewayService.getDeliveryOrder(user, deliveryId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.LIVREUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/deliveries')
  getAllDeliveryOrders(@CurrentUser() user: User, @Query('type') type: string) {
    return this.gatewayService.getAllDeliveryOrders(user, type);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/clients/deliveries/:deliveryId')
  getClientDelivery(@CurrentUser() user: User, @Param('deliveryId') deliveryId: string) {
    return this.gatewayService.getClientDelivery(user, deliveryId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.CLIENT)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/clients/deliveries')
  getClientDeliveries(@CurrentUser() user: User) {
    return this.gatewayService.getAllClientDeliveries(user);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/restaurants/:restaurantId/deliveries/:deliveryId')
  getRestaurantDelivery(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('deliveryId') deliveryId: string,
  ) {
    return this.gatewayService.getRestaurantDelivery(user, restaurantId, deliveryId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Get('/restaurants/:restaurantId/deliveries')
  getRestaurantDeliveries(@CurrentUser() user: User, @Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllRestaurantDeliveries(user, restaurantId);
  }

  //-------------------------------Restaurant--------------------------------

  @ApiBody({ type: CreateRestaurantDto })
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('restaurant-picture', restaurantStorage))
  @Post('/restaurants')
  createRestaurant(
    @CurrentUser() user: User,
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile(new ProfileFileValidationPipe())
    restaurantPicture: Express.Multer.File,
  ) {
    return this.gatewayService.createRestaurant(user, createRestaurantDto, restaurantPicture);
  }

  @ApiBody({ type: EditRestaurantDto })
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('restaurant-picture', restaurantStorage))
  @Patch('/restaurants/:id')
  editRestaurant(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() editRestaurantDto: EditRestaurantDto,
    @UploadedFile(new ProfileFileValidationPipe())
    restaurantPicture: Express.Multer.File,
  ) {
    return this.gatewayService.editRestaurant(user, id, editRestaurantDto, restaurantPicture);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  // @Roles(Role.RESTAURATEUR)
  @Delete('/restaurants/:id')
  deleteRestaurant(@CurrentUser() user: User, @Param('id') id: string) {
    return this.gatewayService.deleteRestaurant(user, id);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants/:id')
  getRestaurant(@Param('id') id: string) {
    return this.gatewayService.getRestaurant(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants')
  getAllRestaurants() {
    return this.gatewayService.getAllRestaurants();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/restaurant/:id/picture')
  getRestaurantPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getRestaurantPicture(id, res);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants/:id/infos')
  getRestaurantInfos(@Param('id') id: string) {
    return this.gatewayService.getRestaurantInfos(id);
  }

  //-------------------------------Item--------------------------------

  @ApiBody({ type: CreateItemDto })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Post('/restaurants/:restaurantId/items')
  createItem(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Body() createItemDto: CreateItemDto,
    @UploadedFile(new ProfileFileValidationPipe())
    itemPicture: Express.Multer.File,
  ) {
    return this.gatewayService.createItem(user, restaurantId, createItemDto, itemPicture);
  }

  @ApiBody({ type: EditItemDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Patch('/restaurants/:restaurantId/items/:itemId')
  editItem(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('itemId') itemId: string,
    @Body() editItemDto: EditItemDto,
    @UploadedFile(new ProfileFileValidationPipe())
    itemPicture: Express.Multer.File,
  ) {
    return this.gatewayService.editItem(user, restaurantId, itemId, editItemDto, itemPicture);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Delete('/restaurants/:restaurantId/items/:itemId')
  deleteItem(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.gatewayService.deleteItem(user, restaurantId, itemId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants/:restaurantId/items/:itemId')
  getItem(@Param('restaurantId') restaurantId: string, @Param('itemId') itemId: string) {
    return this.gatewayService.getItem(restaurantId, itemId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants/:restaurantId/items')
  getAllItems(@Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllItems(restaurantId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/item/:id/picture')
  getItemPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getItemPicture(id, res);
  }

  //-------------------------------Menu--------------------------------

  @ApiBody({ type: CreateMenuDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @UseInterceptors(FileInterceptor('menu-picture', menuStorage))
  @Post('/restaurants/:restaurantId/menus')
  createMenu(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Body() createMenuDto: CreateMenuDto,
    @UploadedFile(new ProfileFileValidationPipe())
    menuPicture: Express.Multer.File,
  ) {
    return this.gatewayService.createMenu(user, restaurantId, createMenuDto, menuPicture);
  }

  @ApiBody({ type: EditMenuDto })
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @UseInterceptors(FileInterceptor('menu-picture', menuStorage))
  @Patch('/restaurants/:restaurantId/menus/:menuId')
  editMenu(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
    @Body() editMenuDto: EditMenuDto,
    @UploadedFile(new ProfileFileValidationPipe())
    menuPicture: Express.Multer.File,
  ) {
    return this.gatewayService.editMenu(user, restaurantId, menuId, editMenuDto, menuPicture);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @Delete('/restaurants/:restaurantId/menus/:menuId')
  deleteMenu(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
  ) {
    return this.gatewayService.deleteMenu(user, restaurantId, menuId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  // @Roles(Role.RESTAURATEUR)
  @Get('/restaurants/:restaurantId/menus/:menuId')
  getMenu(@Param('restaurantId') restaurantId: string, @Param('menuId') menuId: string) {
    return this.gatewayService.getMenu(restaurantId, menuId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @Get('/restaurants/:restaurantId/menus')
  getAllMenus(@Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllMenus(restaurantId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/menu/:id/picture')
  getMenuPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getMenuPicture(id, res);
  }
}

//! Don't forget to remove comment from roles guard in the controller
