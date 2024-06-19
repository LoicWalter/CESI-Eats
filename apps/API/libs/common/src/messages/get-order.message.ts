export class GetOrderMessage {
  constructor(
    public readonly userId: string,
    public readonly orderId: string,
  ) {}
}
