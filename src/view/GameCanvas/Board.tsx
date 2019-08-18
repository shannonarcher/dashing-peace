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

const Board: React.FC<BoardProps> = ({ card }) => {
  return (
    <div className="Board">
      <div className="panel">
        <div className="grid">
          {/* {board.grid.map(row =>
            row.map((gs: GridSquare, index: number) => (
              <div
                key={index}
                className={[
                  gs.pawn ? `color-${gs.pawn.color}` : '',
                  gs.pawn && gs.pawn.color === board.activeTeam.color
                    ? 'active'
                    : ''
                ].join(' ')}
              >
                <div className="grid-position">
                  {gs.x},{gs.y}
                </div>
                {gs.pawn
                  ? gs.pawn instanceof StudentPawnModel
                    ? '♜'
                    : '♚'
                  : gs.text || ' '}
              </div>
            ))
          )} */}
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
