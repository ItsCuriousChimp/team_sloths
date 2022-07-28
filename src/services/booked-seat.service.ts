import BookedSeatModel from '../common/models/booked-seat.model';
import BookedSeatRepository from '../repositories/booked-seat.repository';

export default class BookedSeatService {
  public async getBookedSeatsByShowId(showId: string) : Promise<BookedSeatModel[]> {
    const bookedSeatRepositoryInstance = new BookedSeatRepository();
    const bookedSeats = await bookedSeatRepositoryInstance.getBookedSeatsByShowId(showId);
    return bookedSeats;
  }
}
