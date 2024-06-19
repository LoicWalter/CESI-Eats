import { User } from '@gen/client/users';

export class GetReceivedOrderMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly orderId: string,
  ) {}
}
