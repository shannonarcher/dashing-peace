import CardMap from "./CardMap";

class Card {
    readonly name: string;
    readonly map: CardMap;

    constructor(name: string, map: CardMap) {
        this.name = name;
        this.map = map;
    }
}

export default Card;