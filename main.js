import { Tetris } from './src/tetris.js';
import { drawGrid } from './src/helpers.js';

document.addEventListener('DOMContentLoaded', function(event) {
    const tetris = new Tetris();
    const grid = tetris.getGrid();

    drawGrid(grid.getDimensions(), grid.getElement());

    /* tetris.start();
    setInterval(() => {
        tetris.progress();
    }, 1000); */
});
