import Pawn from './pawns/Pawn';

export default class GridSquare {
  private _pawn?: Pawn;
  private _text?: string;
  readonly x: number;
  readonly y: number;

  constructor(contents: string | Pawn | undefined, x: number, y: number) {
    if (contents instanceof Pawn) {
      this._pawn = contents;
    } else if (contents) {
      this._text = contents.toString();
    }

    this.x = x;
    this.y = y;
  }

  get pawn(): Pawn | undefined {
    return this._pawn;
  }

  get text(): string | undefined {
    return this._text;
  }
}
