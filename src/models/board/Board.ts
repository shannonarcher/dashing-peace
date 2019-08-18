import Team from './team/Team';
import Pawn from './pawns/Pawn';
import Coordinate from 'models/Coordinate';
import Player from 'models/player/Player';
import GridSquare from './GridSquare';
import BoardViewModel from 'view-models/board/BoardViewModel';

class Board {
  private _team1: Team;
  private _team2: Team;
  private _activeTeam: Player;

  readonly grid: Array<GridSquare>[];

  constructor(p1: Player, p2: Player) {
    this._activeTeam = p1;

    this._team1 = new Team(p1.color);
    this._team2 = new Team(p2.color);

    this.grid = this.buildBoard(this._team1, this._team2);
  }

  get activeTeam(): Player {
    return this._activeTeam;
  }

  set activeTeam(player: Player) {
    this._activeTeam = player;
  }

  get viewModel(): BoardViewModel {
    return new BoardViewModel(this.grid);
  }

  at(x: number, y: number): GridSquare {
    if (x <= 0 || x >= this.grid[0].length || y <= 0 || y >= this.grid.length) {
      throw new Error('out of bounds');
    }
    return this.grid[y][x];
  }

  set(x: number, y: number, pawn: Pawn): void {
    // get pawn current position
    const { x: cx, y: cy }: Coordinate = this.findPawn(pawn);

    this.grid[y][x] = new GridSquare(pawn, x, y);
    this.grid[cy][cx] = new GridSquare(undefined, cx, cy);
  }

  static from(coordinate: string): { x: number; y: number } {
    const yMap: { [s: string]: number } = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    };

    const [alpha, num] = coordinate.split('');
    const x = Number(num);
    const y: number = yMap[alpha];

    return {
      x,
      y
    };
  }

  private findPawn(pawn: Pawn): Coordinate {
    const selectedSquare: GridSquare | undefined = new Array<GridSquare>()
      .concat(...this.grid)
      .find((square: GridSquare) => {
        return square.pawn === pawn;
      });

    if (!selectedSquare) {
      throw new Error('pawn doesnt exist');
    }

    return new Coordinate(selectedSquare.x, selectedSquare.y);
  }

  private buildBoard(t1: Team, t2: Team): Array<GridSquare>[] {
    return [
      [...new Array(6)].map((v, i) => (i === 0 ? '' : i)),
      ['a', ...t1.students.slice(0, 2), t1.master, ...t1.students.slice(2)],
      ['b', ...new Array(5)],
      ['c', ...new Array(5)],
      ['d', ...new Array(5)],
      ['e', ...t2.students.slice(0, 2), t2.master, ...t2.students.slice(2)]
    ].map((row, y) => row.map((cell, x) => new GridSquare(cell, x, y)));
  }
}

export default Board;
