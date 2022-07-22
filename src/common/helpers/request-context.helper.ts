import RequestContextModel from '../models/request-context.model';

const { AsyncLocalStorage } = require('async_hooks');

export default class RequestContextHelper {
  private static storage : Map<String, RequestContextModel> = new Map();
  private static asyncLocalStorage = new AsyncLocalStorage();

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
