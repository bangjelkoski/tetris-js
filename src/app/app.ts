import { Storage } from '../storage/storage';
import { LocalStorageStrategy } from '../storage/strategies/local';

export default class App {
  private storage: Storage;

  constructor() {
    this.storage = new Storage(new LocalStorageStrategy());
  }

  init(callback = () => {}) {
    if (document.readyState !== 'loading') {
      // Document is already ready, call the callback directly
      callback();
    } else if (document.addEventListener) {
      // All modern browsers to register DOMContentLoaded
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      // Old IE browsers
      (<any>document).attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          callback();
        }
      });
    }
  }
}
