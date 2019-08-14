import CommandInterpreter from './CommandInterpreter';
import CommandMap from './CommandMap';

test('interpretting a move command', () => {
    const move = jest.fn();
    const map = new CommandMap(move);
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('mv a1 donkey 1');
    expect(move).toHaveBeenCalledWith('a1', 'donkey', '1');
});

test('interpretting a nonsense command', () => {
    const move = jest.fn();
    const map = new CommandMap(move);
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('interpret this');
    expect(move).not.toHaveBeenCalled();
});