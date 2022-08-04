import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export default class TransactionsDataStorage {
  public async runInTransaction(func : any) {
    return prisma.$transaction(async (prismaInstance:any) => func(prismaInstance), {
      maxWait: 5000,
      timeout: 10000,
    });
  }
}
