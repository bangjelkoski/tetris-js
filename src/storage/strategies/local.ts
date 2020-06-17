import store from 'store2';
import { Strategy } from '../storage';

export class LocalStorageStrategy implements Strategy {
  get(key: string): any {
    return store.get(key);
  }

  set(key: string, value: any): any {
    return store.set(key, value);
  }

  remove(key: string): any {
    return store.remove(key);
  }
}
