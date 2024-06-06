export class CreateRestaurantMessage {
  constructor(
    public readonly name: string,
    public readonly owner: string,
    public readonly priceRange: string,
    public readonly currentOffer: number,
    public readonly image: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly siret: string,
    public readonly category: string,
  ) {}
}
