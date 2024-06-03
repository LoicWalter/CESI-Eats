import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Post('/users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.gatewayService.createUser(createUserDto);
  }

  @Post('/orders')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.gatewayService.createOrder(createOrderDto);
  }
}
