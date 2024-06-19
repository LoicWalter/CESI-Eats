import { User } from '@gen/client/users';

export class DeleteOrderMessage {
  constructor(
    public readonly user: User,
    public readonly orderId: string,
  ) {}
}
