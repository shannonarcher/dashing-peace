import Team from "./Team";
import Pawn from "./Pawn";

class Board {
    private redTeam: Team;
    private blueTeam: Team;
    
    readonly grid: any[];

    constructor() {
        this.redTeam = new Team('red');
        this.blueTeam = new Team('blue');

        this.grid = this.buildBoard(this.redTeam, this.blueTeam);
    }

    private buildBoard(t1: Team, t2: Team): any[] {
        return [
            [...t1.students.slice(0, 2), t1.master, ...t1.students.slice(2)],
            [...new Array(5)],
            [...new Array(5)],
            [...new Array(5)],
            [...t2.students.slice(0, 2), t2.master, ...t2.students.slice(2)],
        ].map(
            (row) => row.map(x => new GridSquare(x)),
        );
    }
}

export class GridSquare {
    private _pawn: Pawn;

    constructor(pawn: Pawn) {
        this._pawn = pawn;
    }

    get pawn() {
        return this._pawn;
    }
}

export default Board;