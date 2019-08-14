import React from 'react';


import Player from 'view/GameCanvas/Player';
import Board from 'view/GameCanvas/Board';

import './GameCanvas.scss';
import GameViewModel from 'view-models/game/GameViewModel';

interface IGameCanvasProps {
    game: GameViewModel;
}

const GameCanvas: React.FC<IGameCanvasProps> = ({game}) => {
    const {board, p1, p2, fieldCard} = game;

    return (
        <div className="GameCanvas debug">
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