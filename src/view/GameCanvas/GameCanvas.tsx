import React from 'react';
import PropTypes from 'prop-types';

import Player from 'view/GameCanvas/Player';
import Board from 'view/GameCanvas/Board';

import './GameCanvas.scss';
import GameViewModel from 'view-models/game/GameViewModel';

interface GameCanvasProps {
  game: GameViewModel;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ game }) => {
  const { board, p1, p2, fieldCard } = game;

  return (
    <div className="GameCanvas debug">
      <div className="row row--flipped">
        <Player player={p1} />
      </div>
      <div className="row">
        <Board board={board} card={fieldCard} />
      </div>
      <div className="row">
        <Player player={p2} />
      </div>
    </div>
  );
};

GameCanvas.propTypes = {
  game: PropTypes.instanceOf(GameViewModel).isRequired
};

export default GameCanvas;
