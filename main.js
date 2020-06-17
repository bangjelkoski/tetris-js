import App from './src/app/app';
import Tetris from './src/tetris/tetris';
import { drawGrid } from './src/helpers/helpers';

new App().init(() => {
  const tetris = new Tetris();
  const grid = tetris.getGrid();

  drawGrid(grid.getDimensions(), grid.getElement());

  tetris.start();
  const interval = setInterval(() => {
    if (tetris.isGameOver()) {
      console.warn(
        `Game over! You have managed to get total of ${tetris.getPoints()} points`
      );
      clearInterval(interval);
    } else {
      tetris.progress();
    }
  }, 500);
});
