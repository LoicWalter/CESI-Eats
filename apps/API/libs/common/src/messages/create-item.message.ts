import { CreateItemDto } from 'apps/api-gateway/src/dto';

export class CreateItemMessage {
  constructor(
    public readonly dto: CreateItemDto,
    public readonly itemPicture?: string,
  ) {}
}
