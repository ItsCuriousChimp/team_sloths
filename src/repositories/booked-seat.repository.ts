import { PrismaClient } from '@prisma/client';
import BookedSeatModel from '../common/models/booked-seat.model';

const prisma: PrismaClient = new PrismaClient();

export default class BookedSeatRepository {
  public async getBookedSeatsByShowId(showId : string) : Promise<BookedSeatModel[]> {
    const bookedSeat : any = await prisma.bookedSeat.findMany({
      where: {
        showId,
      },
    });
    const bookedSeatsList : BookedSeatModel[] = [];
    bookedSeat.forEach((seat : any) => {
      bookedSeatsList.push(this.createBookedSeatModel(seat));
    });
    return bookedSeatsList;
  }

  public createBookedSeatModel(seat: any): BookedSeatModel {
    const bookedSeatModel: BookedSeatModel = new BookedSeatModel(
      seat.id,
      seat.seatId,
      seat.showId,
      seat.bookingId,
    );
    return bookedSeatModel;
  }
}
