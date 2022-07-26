export default class RequestBasePayload {
  private schema;
  public extract() {
    Object.keys(this).forEach((key) => {
      console.log(key);
    });
  }
}
