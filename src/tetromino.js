import { tetrominos } from './tetrominos.js';
import { removeBackgroundColor, applyBackgroundColor } from './helpers.js';

export class Tetromino {
    constructor(position) {
        this.setPosition(position)
            .setShape(Math.floor(Math.random() * tetrominos.length))
            .setCurrentShapeIndex(Math.floor(Math.random() * this.getShape().length))
            .setCurrentShape();
    }

    iterateCurrentShape(callback) {
        const currentShape = this.getCurrentShape();
        const { row, col } = this.getPosition();

        for (let i = 0; i < currentShape.length; i++) {
            for (let j = 0; j < currentShape[i].length; j++) {
                if (currentShape[i][j]) {
                    callback(row + i, col + j);
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

    setPosition({ row, col }) {
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

    move(position) {
        this.clear()
            .setPosition(position)
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
