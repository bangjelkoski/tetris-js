import { Grid } from './grid.js';
import { Tetromino } from './tetromino.js';
import { iterateCurrentShape } from './helpers.js';

/**
 * Key codes
 */
const DOWN = 40;
const UP = 38;
const RIGHT = 39;
const LEFT = 37;

export class Tetris {
    constructor() {
        this.setGrid()
            .setCurrentTetromino({})
            .setNextTetromino({})
            .setPoints();

        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case LEFT:
                    return this.moveTetromino(LEFT);
                case UP:
                    return this.rotateTetromino();
                case RIGHT:
                    return this.moveTetromino(RIGHT);
                case DOWN:
                    return this.moveTetromino(DOWN);
            }
        });
    }

    getGrid() {
        return this.grid;
    }

    getPoints() {
        return this.points;
    }

    getNewTetromino(row, col = 0) {
        const { width: gridWidth } = this.getGrid().getDimensions();
        const positionRow = row || gridWidth / 2 - 2;

        return new Tetromino({ row: positionRow, col });
    }

    getNextTetromino() {
        return this.nextTetromino;
    }

    getCurrentTetromino() {
        return this.currentTetromino;
    }

    setGrid() {
        this.grid = new Grid();

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
        if (this.isGameOver()) {
            alert(`Game over! You have managed to get total of ${this.getPoints()} points`);
        }

        this.moveTetromino(DOWN);
    }

    rotateTetromino() {
        //
    }

    moveTetromino(direction) {
        const tetromino = this.getCurrentTetromino();
        const { row, col } = tetromino.getPosition();
        let potentialPosition;

        switch (direction) {
            case DOWN:
                potentialPosition = { row, col: col + 1 };
                break;
            case RIGHT:
                potentialPosition = { row: row + 1, col };
                break;
            case LEFT:
                potentialPosition = { row: row - 1, col };
                break;
        }

        if (this.canTetrominoBeMoved(potentialPosition, direction)) {
            if (!this.haveTetrominoLanded(potentialPosition)) {
                tetromino.move(potentialPosition);
            } else {
                tetromino.setPosition(potentialPosition);
                this.addTetrominoToLanded(tetromino);
            }
        }
    }

    canTetrominoBeMoved(potentialPosition, direction) {
        const tetromino = this.getCurrentTetromino();
        tetromino.setPotentialPosition(potentialPosition);

        // Left wall
        if (direction === LEFT && this.collisionOnLeft(tetromino)) {
            return false;
        }

        // Right wall
        if (direction === RIGHT && this.collisionOnRight(tetromino)) {
            return false;
        }

        // End of grid
        if (direction === DOWN && this.collisionOnBottom(tetromino)) {
            return false;
        }

        return true;
    }

    collisionOnLeft(tetromino) {
        const currentShape = tetromino.getCurrentShape();
        const { row: positionRow, col: positionCol } = tetromino.getPotentialPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    if (row + positionRow < 0) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    collisionOnRight(tetromino) {
        const grid = this.getGrid();
        const { width, height } = grid.getDimensions();
        const currentShape = tetromino.getCurrentShape();
        const { row: positionRow, col: positionCol } = tetromino.getPotentialPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    if (row + positionRow >= width) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    collisionOnBottom(tetromino) {
        const grid = this.getGrid();
        const { width, height } = grid.getDimensions();
        const currentShape = tetromino.getCurrentShape();
        const { row: positionRow, col: positionCol } = tetromino.getPotentialPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    if (col + positionCol >= height) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    addTetrominoToLanded(tetromino) {
        //
    }

    haveTetrominoLanded({ row: potentialRow, col: potentialCol }) {
        return false;
    }

    isGameOver() {
        return false;
    }
}
