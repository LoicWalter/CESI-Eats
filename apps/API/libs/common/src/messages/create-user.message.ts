import { Role } from '@gen/client/users';
import { CreateUserDto } from 'apps/api-gateway/src/types/user-utils.types';

export class CreateUserMessage {
  constructor(
    public readonly dto: CreateUserDto,
    public readonly role: Role,
    public readonly profilePicture?: string,
  ) {}
}
