import Player from 'models/player/Player';
import Board from 'models/board/Board';
import Pawn from 'models/board/pawns/Pawn';
import Coordinate from 'models/Coordinate';
import MasterPawn from 'models/board/pawns/MasterPawn';
import GridSquare from 'models/board/GridSquare';

class Referee {
  static judgeMove(
    player: Player,
    board: Board,
    coord: string,
    cardName: string,
    position: number
  ): boolean {
    // test that coord is valid
    if (!/^[a-e]{1}[1-5]{1}$/gi.test(coord)) {
      return false;
    }

    // test that piece on board exists
    const { x, y } = Board.from(coord);
    const currentSquare: GridSquare = board.at(x, y);
    if (!currentSquare.pawn) {
      return false;
    }

    // test that piece on board that exists belongs to player
    const pawn: Pawn = currentSquare.pawn;
    if (pawn.color !== player.color) {
      return false;
    }

    // test that player has card
    const playedCard = player.findMatchingCard(cardName);
    if (!playedCard) {
      return false;
    }

    // test that card has position
    let targetCoord: Coordinate;
    try {
      targetCoord = playedCard.getRelativePosition(position);
    } catch (e) {
      return false;
    }

    // test that selected piece on board can move to position (is within bounds)
    // and isn't blocked by another piece
    try {
      const { direction } = player;
      const targetSquare: GridSquare = board.at(
        x + targetCoord.x * -1 * direction,
        y + targetCoord.y * direction
      );

      if (
        targetSquare &&
        targetSquare.pawn &&
        targetSquare.pawn.color === pawn.color
      ) {
        return false;
      }
    } catch (e) {
      // target square is out of bounds
      return false;
    }

    return true;
  }

  static judgeNoLegalMoves(
    player: Player,
    board: Board,
  ) : boolean {
    const gs = new Array<GridSquare>()
      .concat(...board.grid)
      .filter((g: GridSquare) => g.pawn && g.pawn.color === player.color);
    
    return gs.every((g: GridSquare) => (
      player.cards.every((card) => (
        card.getPositions().every((p, index) => (
          !Referee.judgeMove(player, board, Board.to(g.x, g.y), card.name, index + 1)
        ))
      ))
    ));
  }

  static judgeWin(board: Board): boolean {
    return Referee.judgeWayOfTheStone(board) ||
      Referee.judgeWayOfTheStream(board);
  }

  static judgeWayOfTheStone(board: Board): boolean {
    const kings = Object.keys(
      new Array<GridSquare>()
        .concat(...board.grid)
        .reduce((acc, curr: GridSquare) => {
          if (curr.pawn && curr.pawn instanceof MasterPawn) {
            return {
              ...acc,
              [curr.pawn.color]: true
            };
          }
          return acc;
        }, {})
    );
    return kings.length === 1;
  }

  static judgeWayOfTheStream(board: Board): boolean {
    const archOfTheTemples = new Array<GridSquare>()
        .concat(...board.grid)
        .filter((curr: GridSquare) => !!curr.archOfTheTemple);

    return archOfTheTemples.some((curr: GridSquare) => (
      curr.pawn && 
      curr.pawn instanceof MasterPawn && 
      curr.pawn.color !== curr.archOfTheTemple
    ));
  }
}

export default Referee;
