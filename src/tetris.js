import { Grid } from './grid.js';
import { Tetromino } from './tetromino.js';

import { KEY_CODES } from './helpers.js';
const { UP, DOWN, LEFT, RIGHT } = KEY_CODES;

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
        const tetromino = this.getCurrentTetromino();
        const grid = this.getGrid();

        if (tetromino.canBeRotated(grid)) {
            const { newShapeIndex, potentialPosition } = tetromino.getPotentialPositionAfterRotation();

            if (grid.haveTetrominoLanded(potentialPosition)) {
                return grid.addTetromino(tetromino);
            }

            return tetromino.rotate(newShapeIndex);
        }
    }

    moveTetromino(direction) {
        const tetromino = this.getCurrentTetromino();
        const { row, col } = tetromino.getPosition();
        const grid = this.getGrid();
        const gridDimensions = grid.getDimensions();

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

        tetromino.setPotentialPosition(potentialPosition);

        if (grid.haveTetrominoLanded(tetromino)) {
            grid.addTetromino(tetromino)
                .checkForCompletedLines()
                .fillGrid();
            return this.start();
        }

        if (tetromino.canBeMoved(direction, gridDimensions)) {
            return tetromino.move();
        }
    }

    canTetrominoBeRotated() {}

    addTetrominoToGrid(tetromino) {
        return this.start();
    }

    isGameOver() {
        return false;
    }
}
