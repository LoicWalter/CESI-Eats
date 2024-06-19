import { User } from '@gen/client/users';

export class DeleteItemMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly itemId: string,
  ) {}
}
