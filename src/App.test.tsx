import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('models/game/Game', () => {
  return jest.fn().mockImplementation(() => ({
    get viewModel() {
      return {};
    }
  }));
});
jest.mock('view-models/game/GameViewModel');
jest.mock('view/GameCanvas/GameCanvas', () => {
  return function() {
    return (
      <div></div>
    );
  };
});
jest.mock('view/ConsoleInput/ConsoleInput');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
