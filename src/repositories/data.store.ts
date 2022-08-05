import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class DataStore {
  async transactionMiddleware(body: any) {
    const response = await prisma.$transaction(
      async (prismaInstance: any): Promise<any> => {
        const res = await body(prismaInstance);
        return res;
      },
    );
    return response;
  }
}
