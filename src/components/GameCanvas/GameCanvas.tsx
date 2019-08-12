import React from 'react';

import Game from 'data/game/Game';

import Player from 'components/GameCanvas/Player';
import Board from 'components/GameCanvas/Board';

import './GameCanvas.scss';

interface IGameCanvasProps {
    game: Game;
}

const GameCanvas: React.FC<IGameCanvasProps> = ({game}) => {
    const {board, p1, p2, fieldCard} = game;

    return (
        <div className="GameCanvas">
           <div className="row row--flipped">
               <Player player={p1} />
           </div>
           <div className="row">
                <Board
                    board={board}
                    card={fieldCard}
                />
           </div>
           <div className="row">
               <Player player={p2} />
           </div>
        </div>
    );
};

export default GameCanvas;