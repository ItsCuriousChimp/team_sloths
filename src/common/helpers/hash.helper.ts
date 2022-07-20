import bcrypt from 'bcrypt';

export default class HashHelper {
  public async getHash(inputString: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(inputString, salt);
    return hashedString;
  }

  public async validateHash(inputString: string, hashedString: string): Promise<boolean> {
    const isValid = await bcrypt.compare(inputString, hashedString);
    return isValid;
  }
}
