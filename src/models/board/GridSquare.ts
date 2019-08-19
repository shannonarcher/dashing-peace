import Pawn from './pawns/Pawn';
import GridSquareViewModel from 'view-models/board/GridSquareViewModel';

export default class GridSquare {
  private _pawn?: Pawn;
  readonly x: number;
  readonly y: number;

  constructor(pawn: Pawn | undefined, x: number, y: number) {
    this._pawn = pawn;

    this.x = x;
    this.y = y;
  }

  get pawn(): Pawn | undefined {
    return this._pawn;
  }

  get viewModel(): GridSquareViewModel {
    return new GridSquareViewModel(
      this.pawn && this.pawn.type,
      this.pawn && this.pawn.color,
      undefined,
      this.x,
      this.y
    );
  }
}
