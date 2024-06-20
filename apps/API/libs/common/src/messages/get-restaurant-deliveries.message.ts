import { User } from '@gen/client/users';

export class GetRestaurantDeliveriesMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
  ) {}
}
