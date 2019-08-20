class CommandMap {
  readonly move: Function;
  readonly pass: Function;
  readonly help: Function;

  constructor(
    move: Function,
    pass: Function,
    help: Function,
  ) {
    this.move = move;
    this.pass = pass;
    this.help = help;
  }
}

export default CommandMap;
