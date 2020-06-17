import Cookies from 'js-cookie';
import { Strategy } from '../storage';

export class CookieStorageStrategy implements Strategy {
  get(key: string): any {
    return Cookies.get(key);
  }

  set(key: string, value: any): any {
    return Cookies.set(key, value);
  }

  remove(key: string): any {
    return Cookies.remove(key);
  }
}
