class CardViewModel {
  readonly name: string;
  readonly map: string[][];

  constructor(name: string, map: string[][]) {
    this.name = name;
    this.map = map;
  }
}

export default CardViewModel;
