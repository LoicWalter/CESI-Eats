import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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

  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.CLIENT)
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
