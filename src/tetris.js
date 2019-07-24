import { Grid } from './grid.js';
import { Tetromino } from './tetromino.js';

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

        return new Tetromino(positionRow, col);
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
    }

    progress() {
        if (this.isGameOver()) {
            alert(`Game over! You have managed to get total of ${this.getPoints()} points`);
        }

        this.setPoints(this.getPoints() + 4);
    }

    rotateTetromino() {
        //
    }

    moveTetromino(position) {
        const tetromino = this.getCurrentTetromino();
        const { row, col } = tetromino.getPosition();
        let potentialPosition;

        switch (position) {
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

        if (this.canTetrominoBeMoved(potentialPosition)) {
            this.getCurrentTetromino().move(potentialPosition);
        }
    }

    canTetrominoBeMoved({ row: potentialRow, col: potentialCol }) {
        const grid = this.getGrid();
        const tetromino = this.getCurrentTetromino();
        const tetrominoCurrentShape = tetromino.getCurrentShape();

        // Left wall

        // Right wall

        // Landed

        // End of grid
        return true;
    }

    isGameOver() {
        return false;
    }
}
