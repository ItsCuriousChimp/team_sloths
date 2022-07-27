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
      theatreModelList.push(new TheatreModel(theatreList[i].id, theatreList[i].name));
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
      const showModel = new ShowModel(
        bookedSeats[i].id,
        bookedSeats[i].screenId,
        bookedSeats[i].movieId,
        bookedSeats[i].showStartTimeInUtc,
        bookedSeats[i].showEndTimeInUtc,
        bookedSeats[i].availableUntilUtc,
      );
      showModel.bookedSeat = bookedSeats[i].bookedSeat;
      showsModelList.push(showModel);
    }
    return showsModelList;
  }
}
