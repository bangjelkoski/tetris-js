import Tetromino from './tetromino';

describe('Patterns implementations for the Tetromino Class', () => {
  describe('Refactoring to a Prototype', () => {
    test('tetromino class exists', () => {
      expect(Tetromino).toBeDefined();
    });

    test('tetromino class return a instance of Tetromino when invoked', () => {
      const tetromino = new Tetromino({ row: 1, col: 2 });

      expect(tetromino).toBeDefined();
      expect(tetromino).toBeInstanceOf(Tetromino);
    });
  });
});
