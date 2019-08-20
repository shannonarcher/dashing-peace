import CardMap from './CardMap';
import Coordinate from 'models/Coordinate';

describe('CardMap', () => {
    test('it gets all positions for a map', () => {
        const oxMap = new CardMap('ox');
        expect(oxMap.getPositions()).toEqual([
            new Coordinate(0, 1),
            new Coordinate(1, 0),
            new Coordinate(0, -1),
        ]);

        const emptyMap = new CardMap('empty');
        expect(emptyMap.getPositions()).toEqual([]);
    });

    describe('when getting the relative coordinates of a move', () => {
        describe('when the move exists', () => {
            test('it gets the relative position', () => {
                const oxMap = new CardMap('ox');
                expect(oxMap.getRelativePosition(1)).toEqual(new Coordinate(0, 1));
                expect(oxMap.getRelativePosition(2)).toEqual(new Coordinate(1, 0));
                expect(oxMap.getRelativePosition(3)).toEqual(new Coordinate(0, -1));

                const dragonMap = new CardMap('dragon');
                expect(dragonMap.getRelativePosition(1)).toEqual(new Coordinate(-2, 1));
                expect(dragonMap.getRelativePosition(2)).toEqual(new Coordinate(2, 1));
                expect(dragonMap.getRelativePosition(3)).toEqual(new Coordinate(-1, -1));
                expect(dragonMap.getRelativePosition(4)).toEqual(new Coordinate(1, -1));
            });
        });

        describe('when the move doesnt exist', () => {
            test('it throws an error', () => {
                const oxMap = new CardMap('ox');
                expect(() => oxMap.getRelativePosition(0)).toThrowError('invalid position');
                expect(() => oxMap.getRelativePosition(4)).toThrowError('invalid position');
            });
        })
    });
});