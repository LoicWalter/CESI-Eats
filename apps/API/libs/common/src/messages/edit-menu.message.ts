import { User } from '@gen/client/users';
import { EditMenuDto } from 'apps/api-gateway/src/dto';

export class EditMenuMessage {
  constructor(
    public readonly user: User,
    public readonly restaurantId: string,
    public readonly menuId: string,
    public readonly dto: EditMenuDto,
    public readonly menuPicture?: string,
  ) {}
}
