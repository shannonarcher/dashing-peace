class CardViewModel {
  readonly name: string;
  private _map: Array<string[]>;

  constructor(name: string, map: Array<string[]>) {
    this.name = name;
    this._map = map;
  }

  get map(): Array<string[]> {
    return this._map;
  }
}

export default CardViewModel;
