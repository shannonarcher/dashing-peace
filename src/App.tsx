import React, {useState} from 'react';

// import ConsoleCanvas from 'components/ConsoleCanvas';
import GameCanvas from 'components/GameCanvas/GameCanvas';

import Game from 'data/game/Game';

const App: React.FC = () => {
  const [game, setGame] = useState<Game>(new Game());

  return (
    <div className="App">
      <GameCanvas game={game} />
    </div>
  );
}

export default App;
