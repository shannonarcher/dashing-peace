import React, { useState } from 'react';

import Logger from 'services/logger/Logger';

import GameCanvas from 'view/GameCanvas/GameCanvas';
import ConsoleInput from 'view/ConsoleInput/ConsoleInput';
import ConsoleOutput from 'view/ConsoleOutput/ConsoleOutput';

import Game from 'models/game/Game';
import GameViewModel from 'view-models/game/GameViewModel';

import CommandInterpreter from 'services/command-interpreter/CommandInterpreter';
import CommandMap from 'services/command-interpreter/CommandMap';

const App: React.FC = () => {
  const [logger] = useState<Logger>(new Logger());

  const [game] = useState<Game>(new Game(logger));
  const [gameState, setGameState] = useState<GameViewModel>(game.viewModel);

  const interpreter = new CommandInterpreter(
    new CommandMap(
      (coord: string, cardName: string, position: string): void => {
        game.move(coord, cardName, position);
        setGameState(game.viewModel);
      },
      (cardName: string): void => {
        game.pass(cardName);
        setGameState(game.viewModel);
      },
      () => {
        game.help();
        setGameState(game.viewModel);
      }
    )
  );

  const handleCommand = (command: string): void => {
    interpreter.interpret(command);
  };

  return (
    <div className="App">
      {gameState.winningPlayer ? (
        <div>{gameState.winningPlayer.color.toUpperCase()} Team Wins!</div>
      ) : (
        ''
      )}

      <GameCanvas game={gameState} />
      <ConsoleInput onCommand={handleCommand} />
      <ConsoleOutput output={logger.history} />
    </div>
  );
};

export default App;
