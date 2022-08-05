import { Prisma, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export default class TransactionsDataStore {
  public async executeInTransaction(func : any) : Promise<any> {
    return prisma.$transaction(
      async (prismaInstance : Prisma.TransactionClient) => func(prismaInstance),
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }
}
