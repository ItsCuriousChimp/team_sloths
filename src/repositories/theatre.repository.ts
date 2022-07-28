import { PrismaClient, theatre } from '@prisma/client';
import TheatreModel from '../common/models/theatre.model';
import ShowModel from '../common/models/show.model';
import DateTimeHelper from '../common/helpers/datetime.helper';

const prisma: PrismaClient = new PrismaClient();

export default class TheatreRepository {
  public async getTheatresByCityId(cityId: string): Promise<TheatreModel[]> {
    const theatreList: theatre[] = await prisma.theatre.findMany({
      where: { cityId },
    });
    const theatreModelList: TheatreModel[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      theatreModelList.push(this.makeTheatreModel(theatreList[i]));
    }
    return theatreModelList;
  }

  public async getShowsAndBookedSeatByTheatreIdAndMovieId(
    theatreIdUrl: any,
    movieIdUrl: any,
  ): Promise<ShowModel[]> {
    const bookedSeats: any = await prisma.show.findMany({
      where: {
        showStartTimeInUtc: {
          gte: new DateTimeHelper().getCurrentDate(),
          //  get shows only for next 14 days
          lte: new DateTimeHelper().getDaysAfter(14),
        },
        movieId: movieIdUrl,
        screen: {
          theatreId: {
            contains: theatreIdUrl,
          },
        },
      },
      include: {
        bookedSeat: true,
      },
    });
    const showsModelList: ShowModel[] = [];
    for (let i = 0; i < bookedSeats.length; i += 1) {
      showsModelList.push(this.makeShowModel(bookedSeats[i]));
    }
    return showsModelList;
  }

  private makeShowModel(showData : any) : ShowModel {
    const showModel : ShowModel = new ShowModel(
      showData.id,
      showData.screenId,
      showData.movieId,
      showData.showStartTimeInUtc,
      showData.showEndTimeInUtc,
      showData.availableUntilUtc,
    );
    if (showData.bookedSeat) { showModel.bookedSeat = showData.bookedSeat; }
    return showData;
  }

  private makeTheatreModel(theatreData : any) : TheatreModel {
    const theatreModel : TheatreModel = new TheatreModel(
      theatreData.id,
      theatreData.name,
    );
    return theatreModel;
  }
}
