import { User } from '@gen/client/users';

export class GetRestaurantDeliveryMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly deliveryId: string,
  ) {}
}
