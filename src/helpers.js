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

export { drawGrid, removeBackgroundColor, getEmptySquare, applyBackgroundColor };
