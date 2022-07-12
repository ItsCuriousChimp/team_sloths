import { PrismaClient } from '@prisma/client';
import ShowModel from '../../../common/models/show.model';

const prisma = new PrismaClient();

export default class ShowRepository {
  public async getShow(theatreIdUrl : any, movieIdUrl : any) : Promise<ShowModel[]> {
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

  public async getBookedSeat(theatreIdUrl : any, movieIdUrl : any) : Promise<ShowModel[]> {
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
