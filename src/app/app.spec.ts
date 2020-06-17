import App from './app';

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

  /**
   * We can abstract away checking when the DOM is ready
   * by using the Facade pattern since there are
   * different checks for different type of browsers
   */
  describe('Implementing a method to make onLoad event inter-browser-compatible, making the class implement the Facade pattern', () => {
    test('the app class should have a init method', () => {
      const app = new App();

      const hasInitMethod = (object) => {
        return 'init' in object;
      };

      expect(hasInitMethod(app)).toBe(true);
    });
    test('the app class should have a init method', () => {
      const app = new App();

      const hasInitMethod = (object) => {
        return 'init' in object;
      };

      expect(hasInitMethod(app)).toBe(true);
    });
    test('the app init method should call the callback function when the dom is loaded', async () => {
      const app = new App();

      app.init(() => {
        expect(true).toBe(true);
      });
    });
  });
});
