import { Role } from '@gen/client/users';

export class CreateUserMessage {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
  ) {}
}
