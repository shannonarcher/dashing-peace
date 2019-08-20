import GameViewModel from './GameViewModel';
import BoardViewModel from 'view-models/board/BoardViewModel';
import PlayerViewModel from 'view-models/player/PlayerViewModel';
import CardViewModel from 'view-models/card/CardViewModel';

jest.mock('view-models/board/BoardViewModel');
jest.mock('view-models/player/PlayerViewModel');
jest.mock('view-models/card/CardViewModel');

test('it should have other models', () => {
    const viewModel = new GameViewModel(
        new BoardViewModel([], ''),
        new PlayerViewModel('red', []),
        new PlayerViewModel('blue', []),
        new CardViewModel('ox', []),
    );
    
    expect(viewModel.board instanceof BoardViewModel).toBeTruthy();
    expect(viewModel.p1 instanceof PlayerViewModel).toBeTruthy();
    expect(viewModel.p2 instanceof PlayerViewModel).toBeTruthy();
    expect(viewModel.fieldCard instanceof CardViewModel).toBeTruthy();
});

test('it should have all the models', () => {
    const viewModel = new GameViewModel(
        new BoardViewModel([], ''),
        new PlayerViewModel('red', []),
        new PlayerViewModel('blue', []),
        new CardViewModel('ox', []),
        new PlayerViewModel('blue', []),
    );

    expect(viewModel.winningPlayer instanceof PlayerViewModel).toBeTruthy();
});