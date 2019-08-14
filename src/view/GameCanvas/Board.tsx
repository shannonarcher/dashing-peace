import React from 'react';

import './Board.scss';
import Card from 'view/GameCanvas/Card';

import BoardModel, {GridSquare} from 'models/board/Board';
import CardModel from 'models/card/Card';
import StudentPawnModel from 'models/board/pawns/StudentPawn';

interface IBoardProps {
    board: BoardModel;
    card: CardModel;
}

const Board: React.FC<IBoardProps> = ({
    board,
    card,
}) => {
    return (
        <div className="Board">
            <div className="panel">
                <div className="grid">
                {
                    board.grid.map((row) => 
                        row.map((gs: GridSquare, index: number) => (
                            <div
                                key={index}
                                className={[
                                    (gs.pawn ? `color-${gs.pawn.color}` : ''),
                                    (gs.pawn && gs.pawn.color === board.activeTeam.color ? 'active' : ''),
                                ].join(' ')}
                            >
                                <div className="grid-position">{gs.x},{gs.y}</div>
                                {gs.pawn ? 
                                    (gs.pawn instanceof StudentPawnModel ?
                                        '♜' : '♚'
                                    ) : (gs.text || ' ')
                                }
                            </div>
                        ))
                    )
                }
                </div>
            </div>
            <div className="panel">
                <Card card={card} />
            </div>
        </div>
    );
};

export default Board;