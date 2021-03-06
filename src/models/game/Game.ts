import Board from 'models/board/Board';
import GridSquare from 'models/board/GridSquare';
import Player from 'models/player/Player';
import Card from 'models/card/Card';
import Deck from 'models/deck/Deck';
import Coordinate from 'models/Coordinate';

import Referee from 'services/referee/Referee';
import Logger from 'services/logger/Logger';

import GameViewModel from 'view-models/game/GameViewModel';

class Game {
  readonly board: Board;
  readonly p1: Player;
  readonly p2: Player;

  private _deck: Deck;
  private _fieldCard: Card;
  private _activePlayer: Player;
  private _winningPlayer: Player | undefined;
  private _logger: Logger;

  constructor(logger: Logger, seed: string | undefined = undefined) {
    this._logger = logger;

    this._deck = new Deck();
    this._deck.shuffle(seed);

    this.p1 = new Player('red', true, this._deck.draw(), this._deck.draw());
    this.p2 = new Player('blue', false, this._deck.draw(), this._deck.draw());

    this.board = new Board(this.p1, this.p2);

    this._fieldCard = this._deck.draw();

    this._activePlayer = this.p1;
  }

  get viewModel(): GameViewModel {
    return new GameViewModel(
      this.board.viewModel,
      this.p1.viewModel,
      this.p2.viewModel,
      this._fieldCard.viewModel,
      this.winningPlayer && this.winningPlayer.viewModel
    );
  }

  get activePlayer(): Player {
    return this._activePlayer;
  }

  get winningPlayer(): Player | undefined {
    return this._winningPlayer;
  }

  move(coord: string, cardName: string, position: string): void {
    if (this._winningPlayer) {
      this.log('game complete. start a new game.');
      return;
    }

    const legalMove = Referee.judgeMove(
      this.activePlayer,
      this.board,
      coord,
      cardName,
      Number(position)
    );

    const playerCard = this.activePlayer.findMatchingCard(cardName);
    if (legalMove && playerCard) {
      // move piece
      const { x, y }: Coordinate = Board.from(coord);
      const origin: GridSquare = this.board.at(x, y);

      const { direction } = this.activePlayer;

      const relativeTarget: Coordinate = playerCard.getRelativePosition(
        Number(position)
      );
      const absoluteTarget: Coordinate = new Coordinate(
        x + relativeTarget.x * -1 * direction,
        y + relativeTarget.y * direction
      );

      this.activePlayer.movePawn(this.board, origin.pawn, absoluteTarget);

      // swap field card
      this._fieldCard = this.activePlayer.swapCard(playerCard, this._fieldCard);

      // teardown turn
      this.completeTurn();
    } else {
      this.log('invalid move');
    }
  }

  pass(cardName: string): void {
    const noLegalMoves = Referee.judgeNoLegalMoves(this.activePlayer, this.board);
    const playerCard = this.activePlayer.findMatchingCard(cardName);
    
    if (noLegalMoves && playerCard) {
      // swap field card
      this._fieldCard = this.activePlayer.swapCard(playerCard, this._fieldCard);

      // teardown turn
      this.completeTurn();
    } else if (!noLegalMoves) {
      this.log('legal moves exist');
    } else {
      this.log(`no card matching "${cardName}" found`);
    }
  }

  help(): void {
    const noLegalMoves = Referee.judgeNoLegalMoves(this.activePlayer, this.board);
    if (noLegalMoves) {
      this.log('no legal moves exist');
    } else {
      this.log('legal moves exist');
    }
  }

  private completeTurn(): void {
    const gameComplete = Referee.judgeWin(this.board);

    if (gameComplete) {
      this.log('game complete');
      this._winningPlayer = this.activePlayer;
    } else {
      // toggle active player
      this._activePlayer = this._activePlayer === this.p1 ? this.p2 : this.p1;
      this.board.activeTeam = this._activePlayer;

      this.log(`turn complete. ${this._activePlayer.color} teams turn.`);
    }
  }

  private log(message: String): void {
    this._logger.log(message);
  }
}

export default Game;
