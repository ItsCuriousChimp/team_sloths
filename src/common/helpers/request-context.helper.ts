const { AsyncLocalStorage } = require('async_hooks');

export default class RequestContextHelper {
  public static storage : Map<String, any> = new Map();
  public static asyncLocalStorage = new AsyncLocalStorage();

  public setData(key : String, value: any) {
    RequestContextHelper.asyncLocalStorage.run(RequestContextHelper.storage, () => {
      RequestContextHelper.asyncLocalStorage.getStore().set(key, value);
    });
  }

  public getData(key : String) {
    return RequestContextHelper.asyncLocalStorage.run(
      RequestContextHelper.storage,
      () => RequestContextHelper.asyncLocalStorage.getStore().get(key),
    );
  }
}
