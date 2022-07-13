import { PrismaClient } from '@prisma/client';
import ScreenModel from '../common/models/screen.model';

const prisma = new PrismaClient();

export default class ScreenRepository {
  public async getScreensWithItsSeatsByTheatreIdAndMovieId(
    theatreIdUrl : any,
    movieIdUrl : any,
  ) : Promise<ScreenModel[]> {
    const screens : any = await prisma.screen.findMany({
      where: {
        theatreId: theatreIdUrl,
        show: {
          some: {
            showStartTimeInUtc: {
              gte: new Date(),
              //  get shows only for next 14 days
              lte: new Date(new Date().getTime() + ((1000 * 60 * 60 * 24) * 14)),
            },
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
      const screenModel = new ScreenModel(
        screens[i].id,
        screens[i].theatreId,
        screens[i].screenNumber,
      );
      screenModel.show = screens[i].show;
      screenModel.seat = screens[i].seat;
      screenModelList.push(screenModel);
    }
    return screenModelList;
  }
}
