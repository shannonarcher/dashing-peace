import React from 'react';

import Renderer from 'render/Renderer';
import Game from 'data/game/Game';

const App: React.FC = () => {

  const renderer = new Renderer();
  renderer.render(new Game());

  return (
    <div className="App">

    </div>
  );
}

export default App;
