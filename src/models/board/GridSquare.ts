import Pawn from './pawns/Pawn';
import GridSquareViewModel from 'view-models/board/GridSquareViewModel';

export default class GridSquare {
  private _pawn?: Pawn;
  readonly x: number;
  readonly y: number;

  readonly archOfTheTemple?: string;

  constructor(pawn: Pawn | undefined, x: number, y: number, isArchOfTheTemple: boolean = false) {
    this._pawn = pawn;

    if (isArchOfTheTemple && pawn) {
      this.archOfTheTemple = pawn.color;
    }

    this.x = x;
    this.y = y;
  }

  get pawn(): Pawn | undefined {
    return this._pawn;
  }

  set pawn(pawn: Pawn | undefined) {
    this._pawn = pawn;
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
