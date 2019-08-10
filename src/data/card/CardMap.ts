import CardMapData from './CardMapData';

class CardMap {
    private mapData: string[];

    constructor(type: string) {
        this.mapData = CardMapData[type];
    }
}

export default CardMap;