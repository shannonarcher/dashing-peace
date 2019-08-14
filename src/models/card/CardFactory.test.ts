import CardFactory, { getTypes } from './CardFactory';
import Card from './Card';

jest.mock('./Card');
jest.mock('./CardMap');

test('it should create a card', () => {
    expect(CardFactory('monkey') instanceof Card).toBeTruthy();
});

test('it should get the types of cards', () => {
    const types = getTypes();
    expect(Object.keys(types).length).toBe(16);
    expect(types.ox).toBeDefined();
    expect(types.dragon).toBeDefined();
});