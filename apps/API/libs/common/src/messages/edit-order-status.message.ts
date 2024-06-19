import { User } from '@gen/client/users';
import { OrderStatus } from '@gen/client/orders';

export class EditOrderStatusMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly orderId: string,
    public readonly status: OrderStatus,
  ) {}
}
