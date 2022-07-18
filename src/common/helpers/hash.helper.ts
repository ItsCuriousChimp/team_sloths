const bcrypt = require('bcrypt');

export default class HashHelper {
  public async hashString(stringToHash : String) : Promise<String> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(stringToHash, salt);
  }
}
