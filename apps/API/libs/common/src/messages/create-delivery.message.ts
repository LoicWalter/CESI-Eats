import { CreateDeliveryDto } from 'apps/api-gateway/src/dto';

export class CreateDeliveryMessage {
  constructor(public readonly dto: CreateDeliveryDto) {}
}
