import { User } from '@gen/client/users';

export class GetAllDeliveryOrdersMessage {
  constructor(
    public readonly user: User,
    public readonly type: string,
  ) {}
}
