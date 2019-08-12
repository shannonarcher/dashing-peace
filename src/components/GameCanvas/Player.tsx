import React from 'react';
import './Player.scss';
import Card from 'components/GameCanvas/Card';

import PlayerModel from 'data/Player';

interface IPlayerProps {
    player: PlayerModel;
}

const Player: React.FC<IPlayerProps> = ({player}) => {
    return (
        <div className="Player">
            {player.cards.map(card => (
                <Card card={card} />
            ))}
        </div>
    );
};

export default Player;