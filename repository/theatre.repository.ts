import { PrismaClient, theatre } from '@prisma/client';
import TheatreModel from '../common/models/theatre.model';
import ShowModel from '../common/models/show.model';

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

  public async getShowByTheatreIdAndMovieId(
    theatreIdUrl : any,
    movieIdUrl : any,
  ) : Promise<ShowModel[]> {
    const shows : any = await prisma.show.findMany({
      where: {
        showStartTimeInUtc: {
          gte: new Date(),
        },
        movieId: movieIdUrl,
        screen: {
          theatreId: {
            contains: theatreIdUrl,
          },
        },
      },
    });
    const showsModelList: ShowModel[] = [];
    for (let i = 0; i < shows.length; i += 1) {
      const showModel = new ShowModel(
        shows[i].id,
        shows[i].screenId,
        shows[i].movieId,
        shows[i].showStartTimeInUtc,
        shows[i].showEndTimeInUtc,
        shows[i].availableUntilUtc,
      );
      showsModelList.push(showModel);
    }
    return showsModelList;
  }

  public async getShowsAndBookedSeatByTheatreIdAndMovieId(
    theatreIdUrl : any,
    movieIdUrl : any,
  ) : Promise<ShowModel[]> {
    const bookedSeats : any = await prisma.show.findMany({
      where: {
        showStartTimeInUtc: {
          gte: new Date(),
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
        bookedSeats[i].bookedSeat,
      );
      showsModelList.push(showModel);
    }
    return showsModelList;
  }
}
