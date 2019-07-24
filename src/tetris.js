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

    getNewTetromino(x, y = 0) {
        const { width: gridWidth } = this.getGrid().getDimensions();
        const positionX = x || gridWidth / 2 - 2;

        return new Tetromino(positionX, y);
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
        const { x, y } = tetromino.getPosition();
        let potentialPosition;

        switch (position) {
            case DOWN:
                potentialPosition = { x, y: y + 1 };
                break;
            case RIGHT:
                potentialPosition = { x: x + 1, y };
                break;
            case LEFT:
                potentialPosition = { x: x - 1, y };
                break;
        }

        if (this.canTetrominoBeMoved(potentialPosition)) {
            this.getCurrentTetromino().move(potentialPosition);
        }
    }

    canTetrominoBeMoved({ x: potentialX, y: potentialY }) {
        const grid = this.getGrid();
        const tetromino = this.getCurrentTetromino();
        const tetrominoCurrentShape = tetromino.getCurrentShape();
        const { x, y } = tetromino.getPosition();

        return true;
    }

    isGameOver() {
        return false;
    }
}
