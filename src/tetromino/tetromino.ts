import { TetrimonoContract } from './index';
import { tetrominos } from './tetrominos';
import {
  removeBackgroundColor,
  applyBackgroundColor,
  iterateCurrentShape,
  KEY_CODES,
} from '../helpers/helpers';

const { DOWN, LEFT, RIGHT } = KEY_CODES;

export default class Tetromino implements TetrimonoContract {
  position;
  potentialPosition;
  currentShape;
  currentShapeIndex;
  shape;

  constructor(position) {
    this.setPosition(position)
      .setPotentialPosition(position)
      .setShape(Math.floor(Math.random() * tetrominos.length))
      .setCurrentShapeIndex(Math.floor(Math.random() * this.getShape().length))
      .setCurrentShape();
  }

  getPoints(): number {
    return 4;
  }

  clone() {
    return new Tetromino(this.getPosition());
  }

  getPosition() {
    return this.position;
  }

  getPotentialPosition() {
    return this.potentialPosition;
  }

  getCurrentShape() {
    return this.currentShape;
  }

  getShape() {
    return this.shape;
  }

  getCurrentShapeIndex() {
    return this.currentShapeIndex;
  }

  setCurrentShape() {
    this.currentShape = this.shape[this.getCurrentShapeIndex()];

    return this;
  }

  setPosition({ row, col }) {
    this.position = {
      row,
      col,
    };

    return this;
  }

  setPotentialPosition({ row, col }) {
    this.potentialPosition = {
      row,
      col,
    };

    return this;
  }

  setCurrentShapeIndex(index) {
    this.currentShapeIndex = index;

    return this;
  }

  setShape(index) {
    this.shape = tetrominos[index];

    return this;
  }

  draw() {
    iterateCurrentShape(this, applyBackgroundColor);

    return this;
  }

  clear() {
    iterateCurrentShape(this, removeBackgroundColor);

    return this;
  }

  move() {
    this.clear().setPosition(this.getPotentialPosition()).draw();
  }

  rotate(newShapeIndex) {
    if (this.getShape().length > 1) {
      this.setCurrentShapeIndex(newShapeIndex).clear().setCurrentShape().draw();
    }
  }

  canBeRotated = () => {
    /*
    const currentShapeIndex = this.getCurrentShapeIndex();
    const shape = this.getShape();

    const incrementedIndex = currentShapeIndex + 1;
    const potentialShapeIndex =
      incrementedIndex < shape.length ? incrementedIndex : 0;
      */

    return true;
  };

  canBeMoved(direction, { width, height }) {
    const currentShape = this.getCurrentShape();
    const {
      row: potentialRow,
      col: potentialCol,
    } = this.getPotentialPosition();

    for (let row = 0; row < currentShape.length; row += 1) {
      for (let col = 0; col < currentShape[row].length; col += 1) {
        if (currentShape[row][col]) {
          /**
           * Left wall
           */
          if (direction === LEFT && col + potentialCol < 0) {
            return false;
          }

          /**
           * Right wall
           */
          if (direction === RIGHT && col + potentialCol >= width) {
            return false;
          }

          /**
           * Bottom of the grid
           */
          if (direction === DOWN && row + potentialRow >= height) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
