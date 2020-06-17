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

    test('tetris class should have a getInstance method', () => {
      const isSingleton = (object) => {
        return 'getInstance' in object;
      };

      const object = {
        getInstance() {},
      };

      expect(isSingleton(object)).toBe(true);
    });

    test('tetris class should always return the same instance, even if invoked multiple times', () => {
      const singleton1 = new Tetris();
      const singleton2 = new Tetris();

      expect(singleton1).toBeInstanceOf(Tetris);
      expect(singleton2).toBeInstanceOf(Tetris);
      expect(singleton1).toEqual(singleton2);
    });
  });
});
