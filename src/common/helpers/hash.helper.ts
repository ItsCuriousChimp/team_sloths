const bcrypt = require('bcrypt');

export default class HashHelper {
  public hashString(stringToHash : String) : String {
    return bcrypt.genSalt(12).then((salt : any) => bcrypt.hash(stringToHash, salt));
  }
}
