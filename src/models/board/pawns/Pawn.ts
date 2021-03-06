class Pawn {
  protected _id: number;
  protected _color: string;
  protected _type: string;

  constructor(color: string) {
    this._id = 0;
    this._color = color;
    this._type = 'none';
  }

  get id(): number {
    return this._id;
  }

  get color(): string {
    return this._color;
  }

  get type(): string {
    return this._type;
  }
}

export default Pawn;
