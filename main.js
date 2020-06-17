import { Tetris } from './src/tetris/tetris.js';
import { drawGrid } from './src/helpers/helpers.js';

document.addEventListener('DOMContentLoaded', function (event) {
  const tetris = new Tetris();
  const grid = tetris.getGrid();

  drawGrid(grid.getDimensions(), grid.getElement());

  tetris.start();
  const interval = setInterval(() => {
    if (tetris.isGameOver()) {
      alert(
        `Game over! You have managed to get total of ${tetris.getPoints()} points`
      );
      clearInterval(interval);
    } else {
      tetris.progress();
    }
  }, 500);
});
