import { PrismaClient, theatre } from '@prisma/client';
import TheatreModel from '../../../common/models/theatre.model';

const prisma: PrismaClient = new PrismaClient();

export default class TheatreRepository {
  public async getTheatres(cityId: String): Promise<TheatreModel> {
    const theatreList: theatre[] = await prisma.theatre.findMany({
      where: { cityId: String(cityId) },
    });
    const theatreModel: TheatreModel = new TheatreModel(theatreList);
    return theatreModel;
  }
}
