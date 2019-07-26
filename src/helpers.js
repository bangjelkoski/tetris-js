/**
 * Key codes
 */
const DOWN = 40;
const UP = 38;
const RIGHT = 39;
const LEFT = 37;

export const KEY_CODES = { LEFT, UP, RIGHT, DOWN };

const applyBackgroundColor = (x, y) => {
    const element = document.getElementById(`square-${x}-${y}`);

    element.classList.add('border-blue-600');
    element.classList.add('bg-blue-500');
};

const removeBackgroundColor = (x, y) => {
    const element = document.getElementById(`square-${x}-${y}`);

    element.classList.remove('border-blue-600');
    element.classList.remove('bg-blue-500');
};

const getEmptySquare = (x, y) => {
    const squareSize = 2; // in rems

    const square = document.createElement('div');
    square.setAttribute('id', `square-${x}-${y}`);
    square.style.width = `${squareSize}rem`;
    square.style.height = `${squareSize}rem`;
    square.classList.add('border');

    return square;
};

const drawGrid = ({ width, height }, element) => {
    for (let row = 0; row < height; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('flex', 'w-full', 'border-r', 'border-l');

        if (row == 0) {
            rowElement.classList.add('border-t');
        }

        if (row == height - 1) {
            rowElement.classList.add('border-b');
        }

        for (let col = 0; col < width; col++) {
            const square = getEmptySquare(col, row);
            rowElement.appendChild(square);
        }

        element.appendChild(rowElement);
    }
};

const iterateCurrentShape = (tetromino, callback) => {
    const currentShape = tetromino.getCurrentShape();
    const { row, col } = tetromino.getPosition();

    for (let i = 0; i < currentShape.length; i++) {
        for (let j = 0; j < currentShape[i].length; j++) {
            if (currentShape[i][j]) {
                callback(row + i, col + j);
            }
        }
    }
};

export { drawGrid, iterateCurrentShape, removeBackgroundColor, getEmptySquare, applyBackgroundColor };
