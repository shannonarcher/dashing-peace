import BoardViewModel from './BoardViewModel';
import GridSquareViewModel from './GridSquareViewModel';

jest.mock('./GridSquareViewModel', () => {
    class GridSquareViewModel {
        text: string;
        constructor(a: any, b: any, text: string, x: any, y: any) {
            this.text = text;
        }
    }
    return GridSquareViewModel;
});

test('it should have a grid', () => {
    const row = [...new Array<GridSquareViewModel>(5)]
        .map(() => new GridSquareViewModel('', '', '', 0, 0));
    const viewModel = new BoardViewModel(
        [...new Array<Array<GridSquareViewModel>>(5)].map(() => row),
        'red',
    );

    expect(viewModel.grid.length).toEqual(6);
    expect(viewModel.grid[0].length).toEqual(6);

    expect(viewModel.grid[0][1].text).toEqual('1');
    expect(viewModel.grid[0][2].text).toEqual('2');
    expect(viewModel.grid[0][3].text).toEqual('3');
    expect(viewModel.grid[0][4].text).toEqual('4');
    expect(viewModel.grid[0][5].text).toEqual('5');

    expect(viewModel.grid[1][0].text).toEqual('a');
    expect(viewModel.grid[2][0].text).toEqual('b');
    expect(viewModel.grid[3][0].text).toEqual('c');
    expect(viewModel.grid[4][0].text).toEqual('d');
    expect(viewModel.grid[5][0].text).toEqual('e');
});