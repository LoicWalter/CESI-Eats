import { User } from '@gen/client/users';

export class GetRestaurantOrdersStatsMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
  ) {}
}
