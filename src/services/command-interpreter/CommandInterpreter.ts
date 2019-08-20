import CommandMap from './CommandMap';

class CommandInterpreter {
  private actions: CommandMap;

  constructor(actions: CommandMap) {
    this.actions = actions;
  }

  interpret(input: string): void {
    const [command, ...args] = input.split(' ');
    if (command === 'mv') {
      const [coord, card, position] = args;
      this.actions.move(coord, card, position);
    } else if (command === 'pass') {
      const [card] = args;
      this.actions.pass(card);
    } else if (command === '?') {
      this.actions.help();
    }
  }
}

export default CommandInterpreter;
