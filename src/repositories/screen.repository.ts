import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';
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
      screenModelList.push(this.createScreenModel(screens[i]));
    }
    return screenModelList;
  }

  public createScreenModel(screen: any): ScreenModel {
    const screenModel = new ScreenModel(
      screen.id,
      screen.theatreId,
      screen.screenNumber,
    );
    screenModel.show = screen.show;
    screenModel.seat = screen.seat;
    return screenModel;
  }
}
