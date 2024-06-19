import { User } from '@gen/client/users';

export class GetDeliveryOrderMessage {
  constructor(
    public readonly user: User,
    public readonly deliveryId: string,
  ) {}
}
