import React from 'react';
import './Player.scss';
import Card from 'view/GameCanvas/Card';

import PlayerModel from 'models/player/Player';

interface IPlayerProps {
    player: PlayerModel;
}

const Player: React.FC<IPlayerProps> = ({player}) => {
    return (
        <div className="Player">
            {player.cards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default Player;