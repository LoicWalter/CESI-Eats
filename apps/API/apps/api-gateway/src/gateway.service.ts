import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRestaurantMessage, Microservices, RestaurantMessage } from 'libs/common';
import { OrderEvent, CreateOrderEvent } from '@app/common/events';
import { CreateOrderDto, CreateRestaurantDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(Microservices.ORDERS) private readonly ordersService: ClientProxy,
    @Inject(Microservices.RESTAURANTS) private readonly restaurantsService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.ordersService.emit(
        OrderEvent.CREATE_ORDER,
        new CreateOrderEvent(createOrderDto.name, createOrderDto.price, createOrderDto.email),
      ),
    );
  }

  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return firstValueFrom(
      this.restaurantsService.send(
        RestaurantMessage.CREATE_RESTAURANT,
        new CreateRestaurantMessage(
          createRestaurantDto.name,
          createRestaurantDto.owner,
          createRestaurantDto.priceRange,
          createRestaurantDto.currentOffer,
          createRestaurantDto.image,
          createRestaurantDto.phone,
          createRestaurantDto.address,
          createRestaurantDto.siret,
          createRestaurantDto.category,
        ),
      ),
    );
  }
}
