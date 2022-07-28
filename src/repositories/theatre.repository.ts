import { PrismaClient } from '@prisma/client';
import TheatreModel from '../common/models/theatre.model';
import ShowModel from '../common/models/show.model';
import DateTimeHelper from '../common/helpers/datetime.helper';

const prisma: PrismaClient = new PrismaClient();

export default class TheatreRepository {
  public async getTheatresByCityId(cityId: string): Promise<TheatreModel[]> {
    const theatreList: any = await prisma.theatre.findMany({
      where: { cityId },
    });
    const theatreModelList: TheatreModel[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      theatreModelList.push(this.createTheatreModel(theatreModelList[i]));
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
      showsModelList.push(this.createShowModel(bookedSeats[i]));
    }
    return showsModelList;
  }

  public createTheatreModel(theatre: any): TheatreModel {
    return new TheatreModel(theatre.id, theatre.name);
  }

  public createShowModel(bookedSeat: any): ShowModel {
    const showModel = new ShowModel(
      bookedSeat.id,
      bookedSeat.screenId,
      bookedSeat.movieId,
      bookedSeat.showStartTimeInUtc,
      bookedSeat.showEndTimeInUtc,
      bookedSeat.availableUntilUtc,
    );
    showModel.bookedSeat = bookedSeat.bookedSeat;
    return showModel;
  }
}
