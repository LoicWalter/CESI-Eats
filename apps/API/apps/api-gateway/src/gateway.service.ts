import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Microservices } from './constants/microservices-name';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserEvent, UserEvent, OrderEvent, CreateOrderEvent } from '@app/common/events';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.USERS) private readonly usersService: ClientProxy,
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserDto) {
    console.log('Creating user :', createUserRequest);
    this.usersService.emit(
      UserEvent.CREATE_USER,
      new CreateUserEvent(createUserRequest.email, createUserRequest.password),
    );
  }

  createOrder(createOrderDto: CreateOrderDto) {
    this.ordersService.emit(
      OrderEvent.CREATE_ORDER,
      new CreateOrderEvent(createOrderDto.name, createOrderDto.price, createOrderDto.email),
    );
  }
}
