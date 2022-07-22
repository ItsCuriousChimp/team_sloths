import { AsyncLocalStorage } from 'async_hooks';

export default class AsyncStorage {
  private static storage: Map<String, any> = new Map();
  public getItems() {
    const asyncLocalStorage = new AsyncLocalStorage();
    return asyncLocalStorage.run(AsyncStorage.storage, () => asyncLocalStorage.getStore());
  }

  public setItem(key: string, value: any) {
    const asyncLocalStorage = new AsyncLocalStorage();
    asyncLocalStorage.run(AsyncStorage.storage, () => {
      const store: any = asyncLocalStorage.getStore();
      store.set(key, value);
    });
  }
}
