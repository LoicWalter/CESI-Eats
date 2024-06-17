import { User } from '@gen/client/users';

export class DeleteMenuMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly menuId: string,
  ) {}
}
