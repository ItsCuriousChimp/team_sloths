import { PrismaClient } from '@prisma/client';
import BookedSeatModel from '../common/models/booked-seat.model';

const prisma: PrismaClient = new PrismaClient();

export default class BookedSeatRepository {
  public async getBookedSeatsByShowId(showIdUrl : string) : Promise<BookedSeatModel[]> {
    const bookedSeat : any = await prisma.bookedSeat.findMany({
      where: {
        showId: showIdUrl,
      },
    });
    const bookedSeatsList : BookedSeatModel[] = [];
    bookedSeat.forEach((seat : any) => {
      bookedSeatsList.push(this.makeBookedSeatModel(seat));
    });
    return bookedSeatsList;
  }

  private makeBookedSeatModel(bookedSeatData : any) : BookedSeatModel {
    const bookedSeatModel :BookedSeatModel = new BookedSeatModel(
      bookedSeatData.id,
      bookedSeatData.seatId,
      bookedSeatData.showId,
      bookedSeatData.bookingId,
    );
    return bookedSeatModel;
  }
}
