const bcrypt = require('bcrypt');

export default class HashHelper {
  public async hashString(stringToHash : String) : Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedString = await bcrypt.hash(stringToHash, salt);
    return hashedString;
  }

  public async isHashValueSame(unhashedString : string, hashedString : string) : Promise<Boolean> {
    return bcrypt.compare(unhashedString, hashedString);
  }
}
