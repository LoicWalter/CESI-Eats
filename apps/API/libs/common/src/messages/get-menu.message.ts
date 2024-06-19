export class GetMenuMessage {
  constructor(
    public readonly restaurantId: string,
    public readonly menuId: string,
  ) {}
}
