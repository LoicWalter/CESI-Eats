export class CreateClientMessage {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
