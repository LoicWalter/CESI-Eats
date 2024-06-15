import { User } from '@gen/client/users';
import { EditRestaurantDto } from 'apps/api-gateway/src/dto';

export class EditRestaurantMessage {
  constructor(
    public readonly user: User,
    public readonly id: string,
    public readonly dto: EditRestaurantDto,
    public readonly restaurantPicture?: string,
  ) {}
}
