import { Tetromino } from './tetromino.js';
import { removeBackgroundColor, applyBackgroundColor, drawGrid } from './helpers.js';

const gridWidth = 10;
const gridHeight = 16;

if (gridWidth < 4 || gridHeight < 8) {
    throw new Error('Grid dimensions are too small');
}

export class Grid {
    constructor() {
        this.setDimensions()
            .setElement()
            .setGrid()
            .setTotalCompletedLines();
    }

    getDimensions() {
        return this.dimensions;
    }

    getTotalCompletedLines() {
        return this.totalCompletedLines;
    }

    getElement() {
        return this.element;
    }

    getGrid() {
        return this.grid;
    }

    setDimensions(width = gridWidth, height = gridHeight) {
        this.dimensions = {
            width,
            height,
        };

        return this;
    }

    setElement(id = 'grid') {
        this.element = document.getElementById(id);

        return this;
    }

    setTotalCompletedLines(total = 0) {
        this.totalCompletedLines = total;

        return this;
    }

    setGrid(grid = null) {
        const { width, height } = this.getDimensions();

        this.grid = grid
            ? [...grid]
            : new Array(height).fill(0).map(column => {
                  return new Array(width).fill(0);
              });

        return this;
    }

    addTetromino(tetromino) {
        const currentShape = tetromino.getCurrentShape();
        const grid = this.getGrid();
        const { row: potentialRow, col: potentialCol } = tetromino.getPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    grid[row + potentialRow][col + potentialCol] = 1;
                }
            }
        }

        return this.setGrid(grid);
    }

    haveTetrominoLanded(tetromino) {
        const currentShape = tetromino.getCurrentShape();
        const grid = this.getGrid();
        const { width, height } = this.getDimensions();
        const { row: potentialRow, col: potentialCol } = tetromino.getPotentialPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    if (
                        row + potentialRow < height &&
                        col + potentialCol > 0 &&
                        col + potentialCol < width &&
                        grid[row + potentialRow][col + potentialCol] !== 0
                    ) {
                        return true; // Space is already taken
                    }

                    if (row + potentialRow >= height) {
                        return true; // Bottom wall
                    }
                }
            }
        }

        return false;
    }

    fillGrid() {
        const grid = this.getGrid();
        const { width, height } = this.getDimensions();

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                if (grid[row][col]) {
                    applyBackgroundColor(row, col);
                } else {
                    removeBackgroundColor(row, col);
                }
            }
        }
    }

    checkForCompletedLines() {
        const grid = this.getGrid();
        const { width, height } = this.getDimensions();
        let total = 0;

        for (let row = 0; row < height; row++) {
            if (grid[row].every(element => element)) {
                grid[row] = new Array(width).fill(0);
                total += 1;
            }
        }

        this.setGrid(grid);
        this.setTotalCompletedLines(total);

        return this;
    }
}
