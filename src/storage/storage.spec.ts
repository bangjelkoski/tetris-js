import { Storage, Strategy } from './storage';

describe('Strategy Implementation using TDD', () => {
  test('there should be an Storage class', () => {
    //
  });

  test('the Storage should include a set strategy method, and couple of methods that we need for interacting with the storage', () => {
    const isStorage = (object: any): object is Storage => {
      return (
        'setStrategy' in object &&
        'get' in object &&
        'set' in object &&
        'remove' in object
      );
    };

    const object = {
      get(key): any {},
      set(key, value): any {},
      remove(key): any {},
      setStrategy(strategy): void {},
    };

    expect(isStorage(object)).toBe(true);
  });

  test('there should be an Strategy interface', () => {
    //
  });

  test('the Strategy interface should include couple of methods we need every Strategy to implement', () => {
    const isStrategy = (object: any): object is Strategy => {
      return 'get' in object && 'set' in object && 'remove' in object;
    };

    const object = {
      get(key): any {},
      set(key, value): any {},
      remove(key): any {},
    };

    expect(isStrategy(object)).toBe(true);
  });
});
