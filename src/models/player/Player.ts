import Card from 'models/card/Card';
import Board from 'models/board/Board';
import Pawn from 'models/board/pawns/Pawn';
import Coordinate from 'models/Coordinate';
import PlayerViewModel from 'view-models/player/PlayerViewModel';

class Player {
    private c1: Card;
    private c2: Card;
    
    readonly color: string;
    readonly facesSouth: Boolean;

    constructor(color: string, facesSouth: Boolean, c1: Card, c2: Card) {
        this.color = color;
        this.facesSouth = facesSouth;

        this.c1 = c1;
        this.c2 = c2;
    }

    get cards(): Card[] {
        return [
            this.c1,
            this.c2,
        ];
    }

    get direction(): number {
        return this.facesSouth ? 1 : -1;
    }

    get viewModel(): PlayerViewModel {
        return new PlayerViewModel(
            this.color,
            this.cards.map((card: Card) => card.viewModel),
        );
    }

    movePawn(board: Board, pawn: Pawn | undefined, {x, y}: Coordinate): void {
        if (!pawn) {
            throw new Error('no pawn selected for movement');
        }
        board.set(x, y, pawn);
    }

    swapCard(playedCard: Card, fieldCard: Card): Card {
        if (this.c1 === playedCard) {
            this.c1 = fieldCard;
        }
        
        if (this.c2 === playedCard) {
            this.c2 = fieldCard;
        }

        return playedCard;
    }

    findMatchingCard(cardName: string) : Card | undefined {
        return this.cards.find((card: Card) => (
            cardName.toLowerCase() === card.name.toLowerCase()
        ));
    }
}

export default Player;