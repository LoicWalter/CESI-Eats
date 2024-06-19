import { User } from '@gen/client/users';

export class GetReceivedOrdersMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
  ) {}
}
