import React from 'react';

import './Board.scss';
import Card from 'components/GameCanvas/Card';

import BoardModel, {GridSquare} from 'data/board/Board';
import CardModel from 'data/card/Card';
import StudentPawn from 'data/board/StudentPawn';

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
                                className={
                                    gs.pawn ? 
                                    `color-${gs.pawn.color}` : 
                                    ''
                                }
                            >
                                {gs.pawn ? 
                                    (gs.pawn instanceof StudentPawn ?
                                        '♜' : '♚'
                                    ) : ' '
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