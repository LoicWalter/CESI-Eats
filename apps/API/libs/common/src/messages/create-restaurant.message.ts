import { User } from '@gen/client/users';
import { CreateRestaurantDto } from 'apps/api-gateway/src/dto';

export class CreateRestaurantMessage {
  constructor(
    public readonly user: User,
    public readonly dto: CreateRestaurantDto,
    public readonly restaurantPicture?: string,
  ) {}
}
