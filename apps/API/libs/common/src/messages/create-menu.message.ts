import { User } from '@gen/client/users';
import { CreateMenuDto } from 'apps/api-gateway/src/dto';

export class CreateMenuMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly dto: CreateMenuDto,
    public readonly menuPicture?: string,
  ) {}
}
