import BoardViewModel from 'view-models/board/BoardViewModel';
import PlayerViewModel from 'view-models/player/PlayerViewModel';
import CardViewModel from 'view-models/card/CardViewModel';

class GameViewModel {
  readonly board: BoardViewModel;
  readonly p1: PlayerViewModel;
  readonly p2: PlayerViewModel;
  readonly fieldCard: CardViewModel;
  readonly winningPlayer: PlayerViewModel | undefined;

  constructor(
    board: BoardViewModel,
    p1: PlayerViewModel,
    p2: PlayerViewModel,
    fieldCard: CardViewModel,
    winningPlayer: PlayerViewModel | undefined = undefined
  ) {
    this.board = board;
    this.p1 = p1;
    this.p2 = p2;
    this.fieldCard = fieldCard;
    this.winningPlayer = winningPlayer;
  }
}

export default GameViewModel;
