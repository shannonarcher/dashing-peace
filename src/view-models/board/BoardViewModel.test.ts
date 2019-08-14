import BoardViewModel from './BoardViewModel';

test('it should have a grid', () => {
    const viewModel = new BoardViewModel([]);
    expect(viewModel.grid).toEqual([]);
});