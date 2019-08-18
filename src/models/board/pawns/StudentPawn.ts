import Pawn from './Pawn';

class StudentPawn extends Pawn {
  constructor(color: string, id: number) {
    super(color);
    this._id = id;
  }
}

export default StudentPawn;
