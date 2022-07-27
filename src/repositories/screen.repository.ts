import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';
import ScreenModel from '../common/models/screen.model';

const prisma = new PrismaClient();

export default class ScreenRepository {
  public async getScreensWithItsSeatsByTheatreIdAndMovieId(
    theatreIdUrl : string,
    movieIdUrl : string,
  ) : Promise<ScreenModel[]> {
    const screens : any = await prisma.screen.findMany({
      where: {
        theatreId: theatreIdUrl,
        show: {
          some: {
            showStartTimeInUtc: {
              gte: new DateTimeHelper().getCurrentDate(),
              //  get shows only for next 14 days
              lte: new DateTimeHelper().getDaysAfter(14),
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
