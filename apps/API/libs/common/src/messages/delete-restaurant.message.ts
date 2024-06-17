import { User } from '@gen/client/users';

export class DeleteRestaurantMessage {
  constructor(
    public readonly user: User,
    public readonly id: string,
  ) {}
}
