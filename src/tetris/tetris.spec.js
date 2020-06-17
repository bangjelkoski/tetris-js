import Tetris from './tetris';

describe('Patterns implementations for the Tetris Class', () => {
  describe('Refactoring to a Singleton', () => {
    test('tetris class exists', () => {
      expect(Tetris).toBeDefined();
    });

    test('tetris class return a instance of Tetris when invoked', () => {
      const tetris = new Tetris();

      expect(tetris).toBeDefined();
      expect(tetris).toBeInstanceOf(Tetris);
    });
  });
});
