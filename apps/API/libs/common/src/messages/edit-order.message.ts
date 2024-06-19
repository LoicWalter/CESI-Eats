import { User } from '@gen/client/users';
import { EditOrderDto } from 'apps/api-gateway/src/dto';

export class EditOrderMessage {
  constructor(
    public readonly user: User,
    public readonly id: string,
    public readonly dto: EditOrderDto,
  ) {}
}
