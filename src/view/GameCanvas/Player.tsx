import React from 'react';
import PropTypes from 'prop-types';

import './Player.scss';
import Card from 'view/GameCanvas/Card';

import PlayerViewModel from 'view-models/player/PlayerViewModel';

interface PlayerProps {
  player: PlayerViewModel;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div className="Player">
      {player.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.instanceOf(PlayerViewModel).isRequired
};

export default Player;
