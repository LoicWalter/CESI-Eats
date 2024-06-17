import { User } from '@gen/client/users';
import { EditItemDto } from 'apps/api-gateway/src/dto';

export class EditItemMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly itemId: string,
    public readonly dto: EditItemDto,
    public readonly itemPicture?: string,
  ) {}
}
