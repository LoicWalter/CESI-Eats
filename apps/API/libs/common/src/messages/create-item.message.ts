import { User } from '@gen/client/users';
import { CreateItemDto } from 'apps/api-gateway/src/dto';

export class CreateItemMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly dto: CreateItemDto,
    public readonly itemPicture?: string,
  ) {}
}
