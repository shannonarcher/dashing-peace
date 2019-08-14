import CardViewModel from './CardViewModel';

test('it should have a name and map', () => {
    const viewModel = new CardViewModel('ox', []);
    expect(viewModel.name).toEqual('ox');
    expect(viewModel.map).toEqual([]);
});