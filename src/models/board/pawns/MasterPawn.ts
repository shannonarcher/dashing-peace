import Pawn from './Pawn';

class MasterPawn extends Pawn {
  constructor(color: string) {
    super(color);
    this._type = 'master';
  }
}

export default MasterPawn;
