import CommandInterpreter from './CommandInterpreter';
import CommandMap from './CommandMap';

test('interpretting a move command', () => {
    const move = jest.fn();
    const map = new CommandMap(move, () => {}, () => {});
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('mv a1 donkey 1');
    expect(move).toHaveBeenCalledWith('a1', 'donkey', '1');
});

test('interpretting an incomplete move command', () => {
    const move = jest.fn();
    const map = new CommandMap(move, () => {}, () => {});
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('mv');
    expect(move).toHaveBeenCalledWith('', '', '');
});

test('interpretting a pass command', () => {
    const pass = jest.fn();
    const map = new CommandMap(() => {}, pass, () => {});
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('pass donkey');
    expect(pass).toHaveBeenCalledWith('donkey');
});

test('interpretting an incomplete pass command', () => {
    const pass = jest.fn();
    const map = new CommandMap(() => {}, pass, () => {});
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('pass');
    expect(pass).toHaveBeenCalledWith('');
});

test('interpretting a help command', () => {
    const help = jest.fn();
    const map = new CommandMap(() => {}, () => {}, help);
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('?');
    expect(help).toHaveBeenCalledWith();
});

test('interpretting a nonsense command', () => {
    const move = jest.fn();
    const map = new CommandMap(move, () => {}, () => {});
    const interpreter = new CommandInterpreter(map);
    interpreter.interpret('interpret this');
    expect(move).not.toHaveBeenCalled();
});