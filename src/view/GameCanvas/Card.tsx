import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';
import CardViewModel from 'view-models/card/CardViewModel';

interface CardProps {
  card: CardViewModel;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="Card">
      <div>{card.name}</div>
      <div className="Card__layout">
        {card.map.map((row: string[], j) =>
          row.map((c, k) => (
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

Card.propTypes = {
  card: PropTypes.instanceOf(CardViewModel).isRequired
};

export default Card;
