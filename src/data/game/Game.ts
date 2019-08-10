import Board from "data/board/Board";
import Player from "data/Player";
import Card from "data/card/Card";
import Deck from "data/deck/Deck";

class Game {
    private deck: Deck;

    readonly board: Board;
    readonly p1: Player;
    readonly p2: Player;
    readonly fieldCard: Card;

    constructor(seed: string | undefined = undefined) {
        this.deck = new Deck()
            .shuffle(seed);
        this.board = new Board();

        this.p1 = new Player(this.deck.draw(), this.deck.draw());
        this.p2 = new Player(this.deck.draw(), this.deck.draw());

        this.fieldCard = this.deck.draw();
    }
}

export default Game;