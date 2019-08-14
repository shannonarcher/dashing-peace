import CardViewModel from "view-models/card/CardViewModel";

class PlayerViewModel {
    readonly color: string;
    readonly cards: CardViewModel[];

    constructor(
        color: string,
        cards: CardViewModel[],
    ) {
        this.color = color;
        this.cards = cards;
    }
}

export default PlayerViewModel;