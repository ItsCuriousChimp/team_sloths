import RequestContextModel from '../models/requestContext.model';

const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

export default class RequestContextHelper {
  public static setContext(value: RequestContextModel, callback: any): void {
    asyncLocalStorage.run(value, callback);
  }

  public static getContext(): RequestContextModel {
    const value = asyncLocalStorage.getStore();
    if (value === undefined) { return new RequestContextModel(); }
    return value;
  }
}
