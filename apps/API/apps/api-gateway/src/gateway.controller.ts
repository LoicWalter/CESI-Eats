import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateOrderDto, CreateRestaurantDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from 'libs/common';
import { Role } from '@gen/client/users';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Roles(Role.CLIENT)
  @Get('/1')
  getHello1(): string {
    return 'Hello World!1';
  }

  @Roles('ADMIN')
  @Get('/2')
  getHello2(): string {
    return 'Hello World!2';
  }

  @Roles('ADMIN', 'CLIENT', 'DEV', 'LIVREUR', 'RESTAURANT')
  @Get('/3')
  getHello3(): string {
    return 'Hello World!3';
  }

  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/orders')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.gatewayService.createOrder(createOrderDto);
  }

  @ApiBody({ type: CreateRestaurantDto })
  @Post('/restaurants')
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.gatewayService.createRestaurant(createRestaurantDto);
  }
}
