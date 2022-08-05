import BookedSeatModel from '../common/models/booked-seat.model';
import BaseRepository from './base.repository';

export default class BookedSeatRepository extends BaseRepository {
  public async getBookedSeatsByShowId(showIdUrl : string) : Promise<BookedSeatModel[]> {
    const bookedSeat : any = await this.dsClient.bookedSeat.findMany({
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
