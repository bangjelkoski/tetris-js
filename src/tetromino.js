import { tetrominos } from './tetrominos.js';
import { removeBackgroundColor, applyBackgroundColor } from './helpers.js';

export class Tetromino {
    constructor(x, y) {
        this.setPosition(x, y)
            .setShape(Math.floor(Math.random() * tetrominos.length))
            .setCurrentShapeIndex(Math.floor(Math.random() * this.getShape().length))
            .setCurrentShape();
    }

    iterateCurrentShape(callback) {
        const currentShape = this.getCurrentShape();

        for (let i = 0; i < currentShape.length; i++) {
            for (let j = 0; j < currentShape[i].length; j++) {
                if (currentShape[i][j]) {
                    callback(this.position.row + i, this.position.col + j);
                }
            }
        }
    }

    getPosition() {
        return this.position;
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

    setPosition(row, col = 0) {
        this.position = {
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
        this.iterateCurrentShape(applyBackgroundColor);

        return this;
    }

    clear() {
        this.iterateCurrentShape(removeBackgroundColor);

        return this;
    }

    move(row = this.position.row, col = this.position.col) {
        this.clear()
            .setPosition(row, col)
            .draw();
    }

    rotate() {
        const currentShapeIndex = this.getCurrentShapeIndex();
        const shape = this.getShape();

        const incrementedIndex = currentShapeIndex + 1;
        const potentialShapeIndex = incrementedIndex < shape.length ? incrementedIndex : 0;

        if (this.canRotate(potentialShapeIndex)) {
            if (shape.length > 1) {
                this.setCurrentShapeIndex(potentialShapeIndex)
                    .clear()
                    .setCurrentShape()
                    .draw();
            }
        }
    }
}
