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
            .setGrid();
    }

    getDimensions() {
        return this.dimensions;
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

    setGrid(grid = null) {
        const { width, height } = this.getDimensions();

        this.grid = grid
            ? [...grid]
            : new Array(width).fill(0).map(column => {
                  return new Array(height).fill(0);
              });

        return this;
    }

    fillGrid() {
        const grid = this.getGrid();
        const { width, height } = this.getDimensions();

        for (let row = 0; row < width; row++) {
            for (let col = 0; col < height; col++) {
                if (grid[row][col]) {
                    applyBackgroundColor(row, col);
                } else {
                    removeBackgroundColor(row, col);
                }
            }
        }
    }

    checkForCompletedLines() {
        const grid = [...this.getGrid()];
        const { width } = this.getDimensions();

        for (let row = 0; row < width; row++) {
            if (grid[row].every(element => element)) {
                grid[row].map(element => !element);
            }
        }

        this.setGrid(grid);

        return this;
    }
}
