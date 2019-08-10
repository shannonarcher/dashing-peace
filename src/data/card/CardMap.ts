import CardMapData from './CardMapData';

class CardMap {
    readonly mapData: string[];

    constructor(type: string) {
        this.mapData = CardMapData[type];
    }
}

export default CardMap;