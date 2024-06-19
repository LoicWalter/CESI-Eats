import { User } from '@gen/client/users';

export class GetClientOrderMessage {
  constructor(
    public readonly user: User,
    public readonly orderId: string,
  ) {}
}
