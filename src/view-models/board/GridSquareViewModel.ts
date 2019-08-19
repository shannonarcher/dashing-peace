class GridSquareViewModel {
  readonly pawn?: string;
  readonly color?: string;
  readonly text?: string;
  readonly x: number;
  readonly y: number;

  constructor(
    pawn: string | undefined,
    color: string | undefined,
    text: string | undefined,
    x: number,
    y: number
  ) {
    this.pawn = pawn;
    this.color = color;
    this.text = text;
    this.x = x;
    this.y = y;
  }
}

export default GridSquareViewModel;
