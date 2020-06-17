/**
 * Depending on our needs,
 * we want to have a different type to store
 * user's data, like user score, or level (in the future).
 *
 * We can use both the localStorage or storing this data
 * to a cookie, which is why we are going to implement this
 * using the Strategy pattern
 */
export class Storage {
  private strategy;

  constructor(strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy) {
    this.strategy = strategy;
  }

  public get(key: string): any {
    return this.strategy.get(key);
  }

  public set(key: string, value: any): any {
    return this.strategy.set(key, value);
  }

  public remove(key: string): any {
    return this.strategy.remove(key);
  }
}

export interface Strategy {
  get(key: string): any;
  set(key: string, value: any): any;
  remove(key: string): any;
}
