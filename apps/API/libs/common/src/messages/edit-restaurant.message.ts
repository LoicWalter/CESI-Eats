import { EditRestaurantDto } from 'apps/api-gateway/src/dto';

export class EditRestaurantMessage {
  constructor(
    public readonly id: string,
    public readonly dto: EditRestaurantDto,
    public readonly restaurantPicture?: string,
  ) {}
}
