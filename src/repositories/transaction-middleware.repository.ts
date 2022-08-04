import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class TransactionsMiddleware {
  async transactionMiddleware(body: any) {
    const response = await prisma.$transaction(
      async (prismaInstance: any): Promise<any> => {
        const resp = await body(prismaInstance);
        return resp;
      },
    );
    return response;
  }
}
