import { TetrimonoContract } from './index';
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
});
