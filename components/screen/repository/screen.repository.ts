import { PrismaClient } from '@prisma/client';
import ScreenModel from '../../../common/models/screen.model';

const prisma = new PrismaClient();

export default class ScreenRepository {
  public async getScreens(theatreIdUrl : any, movieIdUrl : any) : Promise<ScreenModel[]> {
    const screens : any = await prisma.screen.findMany({
      where: {
        theatreId: theatreIdUrl,
        show: {
          some: {
            movieId: {
              equals: movieIdUrl,
            },
          },
        },
      },
      include: {
        seat: true,
      },
    });
    const screenModelList : ScreenModel[] = [];
    for (let i = 0; i < screens.length; i += 1) {
      screenModelList.push(new ScreenModel(screens[i]));
    }
    return screenModelList;
  }
}
