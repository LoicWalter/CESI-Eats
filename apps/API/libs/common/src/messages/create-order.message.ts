import { User } from '@gen/client/users';
import { CreateOrderDto } from 'apps/api-gateway/src/dto';

export class CreateOrderMessage {
  constructor(
    public readonly user: User,
    public readonly dto: CreateOrderDto,
  ) {}
}
