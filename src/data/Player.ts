import Card from 'data/card/Card';

class Player {
    private c1: Card;
    private c2: Card;

    constructor(c1: Card, c2: Card) {
        this.c1 = c1;
        this.c2 = c2;
    }

    get cards(): Card[] {
        return [
            this.c1,
            this.c2,
        ];
    }
}

export default Player;