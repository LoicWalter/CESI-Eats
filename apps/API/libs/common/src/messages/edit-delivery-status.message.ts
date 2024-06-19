import { User } from '@gen/client/users';
import { DeliveryStatus } from '@gen/client/deliveries';

export class EditDeliveryStatusMessage {
  constructor(
    public readonly user: User,
    public readonly deliveryId: string,
    public readonly type: string,
    public readonly status?: DeliveryStatus,
  ) {}
}
