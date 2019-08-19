import GridSquareViewModel from './GridSquareViewModel';

class BoardViewModel {
  readonly activeTeam: string;
  private _grid: Array<GridSquareViewModel[]>;

  constructor(grid: Array<GridSquareViewModel[]>, activeTeam: string) {
    this._grid = grid;
    this.activeTeam = activeTeam;
  }

  get grid(): Array<GridSquareViewModel[]> {
    const head = [
      new GridSquareViewModel('', '', '', 0, 0),
      ...[...new Array(5)].map(
        (x, i) => new GridSquareViewModel('', '', (i + 1).toString(), i, 0)
      )
    ];

    const letters = ['a', 'b', 'c', 'd', 'e'];
    const body = this._grid.map((row, y) => [
      new GridSquareViewModel('', '', letters[y], 0, y),
      ...row.map(
        g => new GridSquareViewModel(g.pawn, g.color, g.text, g.x + 1, g.y + 1)
      )
    ]);

    return [head, ...body];
  }
}

export default BoardViewModel;
