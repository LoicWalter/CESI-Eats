import { EditUserDto } from 'apps/api-gateway/src/dto';

export class EditUserMessage {
  constructor(
    public readonly userId: string,
    public readonly dto: EditUserDto,
    public readonly profilePicture?: string,
  ) {}
}
