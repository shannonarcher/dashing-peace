import Player from "models/player/Player";
import Board, { GridSquare } from "models/board/Board";
import Pawn from "models/board/pawns/Pawn";
import Coordinate from "models/Coordinate";
import MasterPawn from "models/board/pawns/MasterPawn";

class Referee {
    static judgeMove(
        player: Player,
        board: Board,
        coord: string,
        cardName: string,
        position: number,
    ) : Boolean {
        // test that coord is valid
        if (!/^[a-e]{1}[1-5]{1}$/ig.test(coord)) {
            return false;
        }

        // test that piece on board exists
        const {x, y} = Board.from(coord);
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
                x + (targetCoord.x * -1 * direction),
                y + (targetCoord.y * direction),
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

    static judgeWin(
        board: Board,
    ) : Boolean {
        const kings = Object.keys(
            []
                .concat(...board.grid)
                .filter((square: GridSquare) => square.pawn && square.pawn instanceof MasterPawn)
                .reduce((acc, curr: { pawn: Pawn }) => ({
                    ...acc,
                    [curr.pawn.color]: true,
                }), {})
        );
        return kings.length === 1;
    }
}

export default Referee;