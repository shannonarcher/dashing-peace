class Pawn {
  protected _id: number;
  protected _color: string;

  constructor(color: string) {
    this._id = 0;
    this._color = color;
  }

  get id(): number {
    return this._id;
  }

  get color(): string {
    return this._color;
  }
}

export default Pawn;
