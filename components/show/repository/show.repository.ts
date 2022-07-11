import { PrismaClient } from '@prisma/client';
import ShowModel from '../../../common/models/show.model';

const prisma = new PrismaClient();

export default class ShowRepository {
  public async getShow(theatreIdUrl : any, movieIdUrl : any) : Promise<ShowModel[]> {
    const shows : any = await prisma.show.findMany({
      where: {
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
      showsModelList.push(new ShowModel(shows[i]));
    }
    return showsModelList;
  }

  public async getBookedSeat(theatreIdUrl : any, movieIdUrl : any) : Promise<ShowModel[]> {
    const bookedSeats : any = await prisma.show.findMany({
      where: {
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
      showsModelList.push(new ShowModel(bookedSeats[i]));
    }
    return showsModelList;
  }
}
