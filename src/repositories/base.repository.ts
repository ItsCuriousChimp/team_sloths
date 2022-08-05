import { Prisma, PrismaClient } from '@prisma/client';

export default class BaseRepository {
  public dsClient: PrismaClient | Prisma.TransactionClient;
  constructor(dsClient?: Prisma.TransactionClient) {
    this.dsClient = dsClient ?? new PrismaClient();
  }
}
