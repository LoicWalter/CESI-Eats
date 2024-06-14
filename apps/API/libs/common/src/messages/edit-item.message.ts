import { EditItemDto } from 'apps/api-gateway/src/dto';

export class EditItemMessage {
  constructor(
    public readonly id: string,
    public readonly dto: EditItemDto,
    public readonly itemPicture?: string,
  ) {}
}
