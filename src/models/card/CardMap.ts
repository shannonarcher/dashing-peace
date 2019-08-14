import CardMapData from './CardMapData';
import Coordinate from 'models/Coordinate';

class CardMap {
    readonly mapData: string[];

    constructor(type: string) {
        this.mapData = CardMapData[type];
    }

    public getRelativePosition(ordinal: number) : Coordinate {
        const flatMap: string = this.mapData.join('');
        
        const possiblePositions = flatMap.match(/[x]/g);
        const canBeFound = possiblePositions &&
            possiblePositions.length >= ordinal &&
            ordinal > 0;

        if (!canBeFound) {
            throw new Error('invalid position');
        }

        const explodedMap = flatMap.split('');

        let found = 0;
        const absolutePosition = explodedMap.reduce((acc, curr) => {
            if (curr === 'x' && found !== ordinal) {
                found += 1;
            }

            if (found === ordinal) {
                return acc;
            }

            return acc + 1;
        }, 0);
        
        const maxIndex = explodedMap.length - 1;
        return new Coordinate(
            (absolutePosition % 5) - 2,
            Math.floor((maxIndex - absolutePosition) / 5) - 2, 
        );
    }
}

export default CardMap;