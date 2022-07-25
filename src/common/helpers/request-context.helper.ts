import RequestContextModel from '../models/request-context.model';

const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

export default class RequestContextHelper {
  public setData(value: RequestContextModel, callback: any): void {
    asyncLocalStorage().run(value, callback);
  }

  public static getData(): RequestContextModel {
    const value = asyncLocalStorage.getStore();
    if (value === undefined) { return new RequestContextModel(); }
    return value;
  }
}
