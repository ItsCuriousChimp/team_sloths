const bcrypt = require('bcrypt');

export default class HashHelper {
  public async hashString(stringToHash : string) : Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedString = await bcrypt.hash(stringToHash, salt);
    return hashedString;
  }

  public async isPasswordSame(password : string, hashedString : String) : Promise<Boolean> {
    return bcrypt.compare(password, hashedString);
  }
}
