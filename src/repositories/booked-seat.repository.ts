import { PrismaClient } from '@prisma/client';
import BookedSeatModel from '../common/models/booked-seat.model';

const prisma: PrismaClient = new PrismaClient();

export default class BookedSeatRepository {
  public async getBookedSeatsByShowId(showIdUrl : String) : Promise<BookedSeatModel[]> {
    const bookedSeat : any = await prisma.bookedSeat.findMany({
      where: {
        showId: String(showIdUrl),
      },
    });
    const bookedSeatsList : BookedSeatModel[] = [];
    bookedSeat.forEach((seat : any) => {
      const bookedSeatModel = new BookedSeatModel(
        seat.id,
        seat.seatId,
        seat.showId,
        seat.bookingId,
      );
      bookedSeatsList.push(bookedSeatModel);
    });
    return bookedSeatsList;
  }
}
