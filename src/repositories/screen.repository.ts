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
    screens.forEach((screenData : any) => {
      screenModelList.push(this.makeScreenModel(screenData));
    });
    return screenModelList;
  }

  private makeScreenModel(screenData : any) : ScreenModel {
    const screenModel : ScreenModel = new ScreenModel(
      screenData.id,
      screenData.theatreId,
      screenData.screenNumber,
    );
    screenModel.show = screenData.show;
    screenModel.seat = screenData.seat;
    return screenModel;
  }
}
