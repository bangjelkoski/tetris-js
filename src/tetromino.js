import { tetrominos } from './tetrominos.js';
import { removeBackgroundColor, applyBackgroundColor, iterateCurrentShape } from './helpers.js';

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
        iterateCurrentShape(this, applyBackgroundColor);

        return this;
    }

    clear() {
        iterateCurrentShape(this, removeBackgroundColor);

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
