export class GetItemMessage {
  constructor(
    public readonly restaurantId: string,
    public readonly itemId: string,
  ) {}
}
