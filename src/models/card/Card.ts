import CardMap from "./CardMap";
import Coordinate from "models/Coordinate";
import CardViewModel from "view-models/card/CardViewModel";

class Card {
    readonly name: string;
    readonly map: CardMap;

    constructor(name: string, map: CardMap) {
        this.name = name;
        this.map = map;
    }

    get viewModel(): CardViewModel {
        return new CardViewModel(
            this.name,
            this.map.mapData.map((md: string) => md.split('')),
        );
    }

    getRelativePosition(position: number): Coordinate {
        return this.map.getRelativePosition(position);
    }
}

export default Card;