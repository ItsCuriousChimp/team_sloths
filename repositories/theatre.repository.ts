import { PrismaClient, theatre } from '@prisma/client';
import TheatreModel from '../common/models/theatre.model';

const prisma: PrismaClient = new PrismaClient();

export default class TheatreRepository {
  public async getTheatres(cityId: String): Promise<TheatreModel[]> {
    const theatreList: theatre[] = await prisma.theatre.findMany({
      where: { cityId: String(cityId) },
    });
    const theatreModelList: TheatreModel[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      theatreModelList.push(new TheatreModel(theatreList[i].id, theatreList[i].name));
    }
    return theatreModelList;
  }
}
