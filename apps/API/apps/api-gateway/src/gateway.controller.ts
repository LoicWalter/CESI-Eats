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
  CreateOrderDto,
  CreateRestaurantDto,
  EditItemDto,
  EditRestaurantDto,
} from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, ProfileFileValidationPipe, Roles, RolesGuard } from 'libs/common';
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

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.CLIENT)
  @Post('/orders')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.gatewayService.createOrder(createOrderDto);
  }

  @ApiBody({ type: CreateRestaurantDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('restaurant-picture', restaurantStorage))
  @Post('/restaurants')
  createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile(new ProfileFileValidationPipe())
    restaurantPicture: Express.Multer.File,
  ) {
    return this.gatewayService.createRestaurant(createRestaurantDto, restaurantPicture);
  }

  @ApiBody({ type: EditRestaurantDto })
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('restaurant-picture', restaurantStorage))
  @Patch('/restaurants/:id')
  editRestaurant(
    @Param('id') id: string,
    @Body() editRestaurantDto: EditRestaurantDto,
    @UploadedFile(new ProfileFileValidationPipe())
    restaurantPicture: Express.Multer.File,
  ) {
    return this.gatewayService.editRestaurant(id, editRestaurantDto, restaurantPicture);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Delete('/restaurants/:id')
  deleteRestaurant(@Param('id') id: string) {
    return this.gatewayService.deleteRestaurant(id);
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

  @ApiBody({ type: CreateItemDto })
  @HttpCode(HttpStatus.CREATED)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Post('/items')
  createItem(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile(new ProfileFileValidationPipe())
    itemPicture: Express.Multer.File,
  ) {
    return this.gatewayService.createItem(createItemDto, itemPicture);
  }

  @ApiBody({ type: EditItemDto })
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @UseInterceptors(FileInterceptor('item-picture', itemStorage))
  @Patch('/items/:id')
  editItem(
    @Param('id') id: string,
    @Body() editItemDto: EditItemDto,
    @UploadedFile(new ProfileFileValidationPipe())
    itemPicture: Express.Multer.File,
  ) {
    return this.gatewayService.editItem(id, editItemDto, itemPicture);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Delete('/items/:id')
  deleteItem(@Param('id') id: string) {
    return this.gatewayService.deleteItem(id);
  }

  @HttpCode(HttpStatus.OK)
  // @Roles(Role.RESTAURATEUR)
  @Get('/items/:id')
  getItem(@Param('id') id: string) {
    return this.gatewayService.getItem(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/items')
  getAllItems() {
    return this.gatewayService.getAllItems();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/item-picture/:id')
  getItemPicture(@Param('id') id: string, @Res() res) {
    return this.gatewayService.getItemPicture(id, res);
  }
}
