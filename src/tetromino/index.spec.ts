import { TetrimonoContract, TetrimonoDecorator, SuperTetrimono } from './index';
import Tetrimono from './tetromino';

describe('Strategy Implementation using TDD', () => {
  test('there should be a TetrimonoContract interface', () => {
    //
  });
  test('the TetrimonoContract interface should include a method', () => {
    const isTetrimonoContract = (object: any): object is TetrimonoContract => {
      return 'getPoints' in object;
    };

    const object = {
      getPoints(): any {},
    };

    expect(isTetrimonoContract(object)).toBe(true);
  });
  test('there should be a Concrete Tetrimono class', () => {
    //
  });
  test('the Concrete Tetrimono class should include a getPoints method', () => {
    const isTetrimono = (object: any): object is Tetrimono => {
      return 'getPoints' in object;
    };

    const tetrimono = new Tetrimono({ row: 0, col: 0 });

    expect(isTetrimono(tetrimono)).toBe(true);
  });
  test('there should be a TetrimonoDecorator class', () => {
    //
  });
  test("the TetrimonoDecorator should have a method getPoints, and that method delegates the call to the component property's getPoints method", () => {
    const tetrimono = new Tetrimono({ row: 0, col: 0 });
    const decorator = new TetrimonoDecorator(tetrimono);

    const result = decorator.getPoints();

    expect(result).toBeDefined();
    expect(result).toEqual(4);
  });
  test('there should be a SuperTetrimono Decorator class', () => {
    //
  });
  test('the SuperTetrimono Decorator class should include a getPoints method', () => {
    const isSuperTetrimono = (object: any): object is SuperTetrimono => {
      return 'getPoints' in object;
    };

    const object = {
      getPoints(): any {},
    };

    expect(isSuperTetrimono(object)).toBe(true);
  });
  test('it returns 4 when we call getPoints on the Tetromino and 8 when we call getPoints on the decorated tetromino i.e SuperTetromino', () => {
    const tetrimono = new Tetrimono({ row: 0, col: 0 });
    const superTetrimono = new SuperTetrimono(tetrimono);

    const resultFromTetromino = tetrimono.getPoints();
    const resultFromSuperTetromino = superTetrimono.getPoints();

    expect(resultFromTetromino).toBeDefined();
    expect(resultFromTetromino).toEqual(4);
    expect(resultFromSuperTetromino).toBeDefined();
    expect(resultFromSuperTetromino).toEqual(8);
  });
});
