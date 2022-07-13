import { PrismaClient, theatre } from '@prisma/client';
import TheatreModel from '../common/models/theatre.model';
import ShowModel from '../common/models/show.model';

const prisma: PrismaClient = new PrismaClient();

export default class TheatreRepository {
  public async getTheatresByCityId(cityId: String): Promise<TheatreModel[]> {
    const theatreList: theatre[] = await prisma.theatre.findMany({
      where: { cityId: String(cityId) },
    });
    const theatreModelList: TheatreModel[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      theatreModelList.push(new TheatreModel(theatreList[i].id, theatreList[i].name));
    }
    return theatreModelList;
  }

  public async getShowsAndBookedSeatByTheatreIdAndMovieId(
    theatreIdUrl : any,
    movieIdUrl : any,
  ) : Promise<ShowModel[]> {
    const bookedSeats : any = await prisma.show.findMany({
      where: {
        showStartTimeInUtc: {
          gte: new Date(),
          //  get shows only for next 14 days
          lte: new Date(new Date().getTime() + ((1000 * 60 * 60 * 24) * 14)),
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
