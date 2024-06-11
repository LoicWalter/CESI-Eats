import { CreateRestaurantDto } from 'apps/api-gateway/src/dto';

export class CreateRestaurantMessage {
  constructor(
    public readonly dto: CreateRestaurantDto,
    public readonly restaurantPicture?: string,
  ) {}
}
