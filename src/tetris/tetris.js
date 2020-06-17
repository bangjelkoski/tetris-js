import { Grid } from '../grid/grid';
import { Tetromino } from '../tetromino/tetromino';
import { KEY_CODES } from '../helpers/helpers';

const { UP, DOWN, LEFT, RIGHT } = KEY_CODES;

export default class Tetris {
  constructor() {
    this.setGrid()
      .setCurrentTetromino({})
      .setNextTetromino({})
      .setPoints()
      .setLevelMultiplier()
      .setLineCompletionPoints();

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case LEFT:
          return this.moveTetromino(LEFT);
        case UP:
          return this.rotateTetromino();
        case RIGHT:
          return this.moveTetromino(RIGHT);
        case DOWN:
          return this.moveTetromino(DOWN);
        default:
          break;
      }
    });
  }

  getGrid() {
    return this.grid;
  }

  getPoints() {
    return this.points;
  }

  getNewTetromino(row) {
    const { width: gridWidth } = this.getGrid().getDimensions();
    const positionCol = row || gridWidth / 2 - 2;

    return new Tetromino({ row: 0, col: positionCol });
  }

  getNextTetromino() {
    return this.nextTetromino;
  }

  getCurrentTetromino() {
    return this.currentTetromino;
  }

  getLineCompletionPoints() {
    return this.lineCompletionPoints;
  }

  getLevelMultiplier() {
    return this.levelMultiplier;
  }

  getTotalNewPoints(completedLines) {
    return (
      this.getPoints() +
      this.getLevelMultiplier() *
        this.getLineCompletionPoints() *
        completedLines
    );
  }

  setGrid() {
    this.grid = new Grid();

    return this;
  }

  setLineCompletionPoints(points = 100) {
    this.lineCompletionPoints = points;

    return this;
  }

  setLevelMultiplier(multiplier = 1) {
    this.levelMultiplier = multiplier;

    return this;
  }

  setPoints(points = 0) {
    this.points = points;

    return this;
  }

  setCurrentTetromino(tetromino = null) {
    this.currentTetromino = tetromino || this.getNewTetromino();

    return this;
  }

  setNextTetromino(tetromino = null) {
    this.nextTetromino = tetromino || this.getNewTetromino();

    return this;
  }

  start() {
    this.setCurrentTetromino().setNextTetromino();
    this.getCurrentTetromino().draw();
    this.setPoints(this.getPoints() + 4);
  }

  progress() {
    return this.moveTetromino(DOWN);
  }

  rotateTetromino = () => {
    const tetromino = this.getCurrentTetromino();
    const grid = this.getGrid();

    if (tetromino.canBeRotated(grid)) {
      const {
        newShapeIndex,
        potentialPosition,
      } = tetromino.getPotentialPositionAfterRotation();

      if (grid.hasTetrominoLanded(potentialPosition)) {
        return this.addTetrominoToGrid();
      }

      return tetromino.rotate(newShapeIndex);
    }
  };

  moveTetromino = (direction) => {
    const tetromino = this.getCurrentTetromino();
    const { row, col } = tetromino.getPosition();
    const grid = this.getGrid();
    const gridDimensions = grid.getDimensions();

    let potentialPosition;
    switch (direction) {
      case DOWN:
        potentialPosition = { row: row + 1, col };
        break;
      case RIGHT:
        potentialPosition = { row, col: col + 1 };
        break;
      case LEFT:
        potentialPosition = { row, col: col - 1 };
        break;
      default:
        break;
    }

    tetromino.setPotentialPosition(potentialPosition);

    if (grid.hasTetrominoLanded(tetromino)) {
      return this.addTetrominoToGrid();
    }

    if (tetromino.canBeMoved(direction, gridDimensions)) {
      return tetromino.move();
    }
  };

  addTetrominoToGrid() {
    const grid = this.getGrid();
    const tetromino = this.getCurrentTetromino();

    grid.addTetromino(tetromino).checkForCompletedLines().fillGrid();

    const completedLines = grid.getTotalCompletedLines();
    const newPoints = this.getTotalNewPoints(completedLines);

    return this.setPoints(newPoints).start();
  }

  isGameOver() {
    const grid = this.getGrid();
    const tetromino = this.getCurrentTetromino();
    const { row } = tetromino.getPosition();

    if (row === 0 && grid.hasTetrominoLanded(tetromino)) {
      return true;
    }

    return false;
  }
}
