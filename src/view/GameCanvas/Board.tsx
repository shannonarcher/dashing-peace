import React from 'react';
import PropTypes from 'prop-types';

import './Board.scss';
import Card from 'view/GameCanvas/Card';

import BoardViewModel from 'view-models/board/BoardViewModel';
import CardViewModel from 'view-models/card/CardViewModel';

interface BoardProps {
  board: BoardViewModel;
  card: CardViewModel;
}

const Board: React.FC<BoardProps> = ({ board, card }) => {
  return (
    <div className="Board">
      <div className="panel">
        <div className="grid">
          {board.grid.map(row =>
            row.map((cell, index: number) => (
              <div
                key={index}
                className={[
                  cell.color ? `color-${cell.color}` : '',
                  cell.color === board.activeTeam ? 'active' : ''
                ].join(' ')}
              >
                <div className="grid-position">
                  {cell.x},{cell.y}
                </div>
                {cell.pawn
                  ? cell.pawn === 'StudentPawn'
                    ? '♜'
                    : '♚'
                  : cell.text || ' '}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="panel">
        <Card card={card} />
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.instanceOf(BoardViewModel).isRequired,
  card: PropTypes.instanceOf(CardViewModel).isRequired
};

export default Board;
