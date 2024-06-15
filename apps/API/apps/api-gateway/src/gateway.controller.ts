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
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {
  CreateItemDto,
  CreateMenuDto,
  CreateOrderDto,
  CreateRestaurantDto,
  EditItemDto,
  EditMenuDto,
  EditRestaurantDto,
} from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  ProfileFileValidationPipe,
  Roles,
  RolesGuard,
} from 'libs/common';
import { User } from '@gen/client/users';
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
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  //-------------------------------Order--------------------------------

  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.CLIENT)
  @Post('/orders')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.gatewayService.createOrder(createOrderDto);
  }

  //-------------------------------Restaurant--------------------------------

  @ApiBody({ type: CreateRestaurantDto })
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
  // @Roles(Role.RESTAURATEUR)
  @Delete('/restaurants/:id')
  deleteRestaurant(@CurrentUser() user: User, @Param('id') id: string) {
    return this.gatewayService.deleteRestaurant(user, id);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Get('/restaurants/:id')
  getRestaurant(@Param('id') id: string) {
    return this.gatewayService.getRestaurant(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/restaurants')
  getAllRestaurants() {
    return this.gatewayService.getAllRestaurants();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/restaurant-picture/:id')
  getRestaurantPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getRestaurantPicture(id, res);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/restaurant-infos/:id')
  getRestaurantInfos(@Param('id') id: string) {
    return this.gatewayService.getRestaurantInfos(id);
  }

  //-------------------------------Item--------------------------------

  @ApiBody({ type: CreateItemDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Post('/:restaurantId/items')
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
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Patch('/:restaurantId/items/:itemId')
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
  @Delete('/:restaurantId/items/:itemId')
  deleteItem(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.gatewayService.deleteItem(user, restaurantId, itemId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Get('/:restaurantId/items/:itemId')
  getItem(@Param('restaurantId') restaurantId: string, @Param('itemId') itemId: string) {
    return this.gatewayService.getItem(restaurantId, itemId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:restaurantId/items')
  getAllItems(@Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllItems(restaurantId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/item-picture/:id')
  getItemPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getItemPicture(id, res);
  }

  //-------------------------------Menu--------------------------------

  @ApiBody({ type: CreateMenuDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('menu-picture', menuStorage))
  @Post('/:restaurantId/menus')
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
  @UseInterceptors(FileInterceptor('menu-picture', menuStorage))
  @Patch('/:restaurantId/menus/:menuId')
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
  @Delete('/:restaurantId/menus/:menuId')
  deleteMenu(
    @CurrentUser() user: User,
    @Param('restaurantId') restaurantId: string,
    @Param('menuId') menuId: string,
  ) {
    return this.gatewayService.deleteMenu(user, restaurantId, menuId);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Get('/:restaurantId/menus/:menuId')
  getMenu(@Param('restaurantId') restaurantId: string, @Param('menuId') menuId: string) {
    return this.gatewayService.getMenu(restaurantId, menuId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:restaurantId/menus')
  getAllMenus(@Param('restaurantId') restaurantId: string) {
    return this.gatewayService.getAllMenus(restaurantId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/menu-picture/:id')
  getMenuPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getMenuPicture(id, res);
  }
}

//! Don't forget to remove comment from roles guard in the controller
