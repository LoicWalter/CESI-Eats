export class CreateOrderEvent {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly email: string,
  ) {}
}
