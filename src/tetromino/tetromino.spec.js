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

    test('tetromino class should have a clone method', () => {
      const tetromino = new Tetromino({ row: 1, col: 2 });

      const isPrototype = (object) => {
        return 'clone' in object;
      };

      expect(isPrototype(tetromino)).toBe(true);
    });

    test('the clone method should return an instance of the Tetromino class when its called with same properties as the original object', () => {
      const tetromino = new Tetromino({ row: 1, col: 2 });
      const clonedTetromino = tetromino.clone();

      expect(clonedTetromino).toBeDefined();
      expect(clonedTetromino).toBeInstanceOf(Tetromino);
      expect(clonedTetromino.getPosition()).toEqual({ row: 1, col: 2 });
    });
  });
});
