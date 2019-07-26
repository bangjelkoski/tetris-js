import { tetrominos } from './tetrominos.js';
import { removeBackgroundColor, applyBackgroundColor, iterateCurrentShape } from './helpers.js';

import { KEY_CODES } from './helpers.js';
const { UP, DOWN, LEFT, RIGHT } = KEY_CODES;

export class Tetromino {
    constructor(position) {
        this.setPosition(position)
            .setShape(Math.floor(Math.random() * tetrominos.length))
            .setCurrentShapeIndex(Math.floor(Math.random() * this.getShape().length))
            .setCurrentShape();
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

    recalculatePosition() {
        //
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
        this.clear()
            .setPosition(this.getPotentialPosition())
            .draw();
    }

    potentiallyRotate() {
        //
    }

    rotate(newShapeIndex) {
        if (this.getShape().length > 1) {
            this.setCurrentShapeIndex(newShapeIndex)
                .clear()
                .setCurrentShape()
                .recalculatePosition()
                .draw();
        }
    }

    canBeRotated(grid) {
        const currentShapeIndex = this.getCurrentShapeIndex();
        const shape = this.getShape();

        const incrementedIndex = currentShapeIndex + 1;
        const potentialShapeIndex = incrementedIndex < shape.length ? incrementedIndex : 0;

        return true;
    }

    canBeMoved(direction, { width, height }) {
        const currentShape = this.getCurrentShape();
        const { row: potentialRow, col: potentialCol } = this.getPotentialPosition();

        for (let row = 0; row < currentShape.length; row++) {
            for (let col = 0; col < currentShape[row].length; col++) {
                if (currentShape[row][col]) {
                    /**
                     * Left wall
                     */
                    if (direction === LEFT && row + potentialRow < 0) {
                        return false;
                    }

                    /**
                     * Right wall
                     */
                    if (direction === RIGHT && row + potentialRow >= width) {
                        return false;
                    }

                    /**
                     * Bottom of the grid
                     */
                    if (direction === DOWN && col + potentialCol >= height - 1) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
