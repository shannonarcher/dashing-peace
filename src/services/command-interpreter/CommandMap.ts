class CommandMap {
    readonly move: Function;

    constructor(
        move: Function,
    ) {
        this.move = move;
    }
}

export default CommandMap;