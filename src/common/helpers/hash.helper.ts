import bcrypt from 'bcrypt';

export default class HashHelper {
  public async getPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
