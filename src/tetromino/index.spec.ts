import { TetrimonoContract } from './index';

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
});
