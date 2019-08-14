import CommandMap from "./CommandMap";

class CommandInterpreter {
    private actions: CommandMap;

    constructor(actions: CommandMap) {
        this.actions = actions;
    }

    interpret(input: string) {
        const [command, ...args] = input.split(' ');
        if (command === 'mv') {
            const [coord, card, position] = args;
            this.actions.move(coord, card, position);
        }
    }
}

export default CommandInterpreter;