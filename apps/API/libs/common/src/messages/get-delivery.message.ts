import { User } from '@gen/client/users';

export class GetDeliveryMessage {
  constructor(
    public readonly user: User,
    public readonly deliveryId: string,
  ) {}
}
