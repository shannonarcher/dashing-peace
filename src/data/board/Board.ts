import Team from "./Team";

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
        ];
    }
}

export default Board;