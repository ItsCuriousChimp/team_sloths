import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class DataStore {
  async executeAsTransaction(func: any) {
    const response = await prisma.$transaction(
      async (prismaInstance: any): Promise<any> => {
        const res = await func(prismaInstance);
        return res;
      },
    );
    return response;
  }
}
