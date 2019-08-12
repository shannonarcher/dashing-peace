import React from 'react';
import './Card.scss';
import CardModel from 'data/card/Card';

interface ICardProps {
    card: CardModel;
}

const Card: React.FC<ICardProps> = ({card}) => {
    return (
        <div className="Card">
            <div>{ card.name }</div>
            <div className="Card__layout">
                {card.map.mapData.map((d: string, j) => d.split('')
                    .map((c, k) => (
                        <div 
                            key={`${j}_${k}`}
                            className={c === 'x' ? 'moveTo' : c === 'o' ? 'origin' : 'none'}
                        >
                            &nbsp;
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Card;