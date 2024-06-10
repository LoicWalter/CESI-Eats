import { User } from '@gen/client/users';
import { EditUserDto } from 'apps/api-gateway/src/dto';

export class EditUserMessage {
  constructor(
    public readonly user: User,
    public readonly dto: EditUserDto,
    public readonly profilePicture?: string,
  ) {}
}
