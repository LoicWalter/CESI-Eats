export class CreateOrderEvent {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly email: string,
  ) {}
}

export class CreateUserEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export enum UserEvent {
  CREATE_USER = 'CREATE_USER',
}

export enum OrderEvent {
  CREATE_ORDER = 'CREATE_ORDER',
}
