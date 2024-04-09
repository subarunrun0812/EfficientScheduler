export class Location {
  constructor(
    readonly name: string,
    readonly address: string,
  ) {}

  equals(other: Location): boolean {
    return this.name === other.name && this.address === other.address
  }
}
