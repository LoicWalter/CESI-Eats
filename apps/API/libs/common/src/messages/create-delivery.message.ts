import { User } from '@gen/client/users';
import { CreateDeliveryDto } from 'apps/api-gateway/src/dto';

export class CreateDeliveryMessage {
  constructor(
    public readonly user: User,
    public readonly dto: CreateDeliveryDto,
  ) {}
}
