import React from 'react';

import Game from 'data/game/Game';
import Card from 'data/card/Card';
import StudentPawn from 'data/board/StudentPawn';
import Board from 'data/board/Board';
import MasterPawn from 'data/board/MasterPawn';

import './ConsoleCanvas.scss';

interface IConsoleCanvasProps {
    game: Game;
}

function renderCard(card: Card, idx: string) {
    return (
        <div className="card" key={idx}>
            <div>{ card.name }</div>
            <table>
                <tbody>
                {
                    card.map.mapData.map((d: string, mdIdx) => (
                        <tr key={`${idx}_${mdIdx}`}>
                            {d.split('').map((c, dIdx) => (
                                <td 
                                    key={`${idx}_${mdIdx}_${dIdx}`} 
                                    data-c={c}>
                                    {c === ' ' ? '\u00A0' : c}
                                </td>
                            ))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

function renderBoard(board: Board) {
    return (
        <div>
            <table>
                <tbody>
                    {board.grid.map((row: any[], rowIdx) => (
                        <tr key={`brow_${rowIdx}`}>
                            {row.map((cell, cellIdx) => (
                                <td 
                                    key={`bcell_${rowIdx}_${cellIdx}`}
                                    data-color={cell ? cell.color : ''}
                                >
                                    {
                                        cell instanceof StudentPawn ? `s${cell.id}` : 
                                        cell instanceof MasterPawn ? 'mm' :
                                        '\u00A0\u00A0'
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const ConsoleCanvas: React.FC<IConsoleCanvasProps> = ({game}) => {
    const {board, p1, p2, fieldCard} = game;

    return (
        <div className="ConsoleCanvas">
            <div className="player">
                // p1
                {p1.cards.map((card: Card, idx) => renderCard(card, `p1_${idx}`))}
            </div>
            <div className="break"></div>
            <div className="board">
                <div className="grid">
                    {renderBoard(board)}
                </div>
                <div>
                    {renderCard(fieldCard, 'fieldCard')}
                </div>
            </div>
            <div className="break"></div>
            <div className="player">
                // p2
                {p2.cards.map((card: Card, idx) => renderCard(card, `p2_${idx}`))}
            </div>
        </div>
    );
};

export default ConsoleCanvas;