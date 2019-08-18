import StudentPawn from 'models/board/pawns/StudentPawn';
import MasterPawn from 'models/board/pawns/MasterPawn';
import Pawn from 'models/board/pawns/Pawn';

class Team {
  private color: string;
  private pawns: Pawn[];

  constructor(color: string) {
    this.color = color;
    this.pawns = [
      new MasterPawn(this.color),
      new StudentPawn(this.color, 1),
      new StudentPawn(this.color, 2),
      new StudentPawn(this.color, 3),
      new StudentPawn(this.color, 4)
    ];
  }

  get master(): MasterPawn {
    const [master] = this.pawns.filter(pawn => pawn instanceof MasterPawn);
    return master;
  }

  get students(): StudentPawn[] {
    return this.pawns.filter(pawn => pawn instanceof StudentPawn);
  }
}

export default Team;
