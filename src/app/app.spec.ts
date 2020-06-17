/**
 * The idea behind this implementation is to implement a App class
 * that helps us manipulate the dom easily.
 */
describe('Patterns implementations for the App Class', () => {
  describe('Initial tests for the App class', () => {
    test('App class exists', () => {
      expect(App).toBeDefined();
    });

    test('App class return a instance of App when invoked', () => {
      const app = new App();

      expect(app).toBeDefined();
      expect(app).toBeInstanceOf(App);
    });
  });
});
