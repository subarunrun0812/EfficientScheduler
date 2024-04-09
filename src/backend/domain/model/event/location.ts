export class Location {
  constructor(
    readonly name: string,
  ) {}

  equals(other: Location): boolean {
    return this.name === other.name
  }
}
