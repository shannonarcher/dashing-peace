import Game from 'data/game/Game';

class Renderer {
    render(
        game: Game,
    ) {
        console.log(
            game.board.grid,
            game.p1.cards,
            game.p2.cards,
            game.fieldCard,
        );
    }
}

export default Renderer;