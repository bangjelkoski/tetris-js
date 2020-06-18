describe('Strategy Implementation using TDD', () => {
  test('there should be a Tetrimono interface', () => {
    //
  });
  test('the Tetrimono interface should include a method', () => {
    const isTetrimono = (object: any): object is Tetrimono => {
      return 'getPoints' in object;
    };

    const object = {
      getPoints(): any {},
    };

    expect(isTetrimono(object)).toBe(true);
  });
});
