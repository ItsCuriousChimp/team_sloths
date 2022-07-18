const bcrypt = require('bcrypt');

export default class HashHelper {
  public async hashString(stringToHash : String) : Promise<String> {
    const salt = await bcrypt.genSalt(12);
    const hashedString = await bcrypt.hash(stringToHash, salt);
    return hashedString;
  }
}
