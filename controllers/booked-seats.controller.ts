import { Request, Response } from 'express';
import BookedSeatModel from '../common/models/booked-seat.model';
import BookedSeatService from '../services/booked-seats.service';
import BookedSeatResponsePayload from './payloads/booked-seats-response.payload';

export default class BookedSeatsController {
  public async getBookedSeatsByMovieId(req : Request, res: Response) {
    const showIdUrl : String = String(req.query.showId);
    const bookedSeatServiceInstance : BookedSeatService = new BookedSeatService();
    const bookedSeatList : BookedSeatModel[] =
    await bookedSeatServiceInstance.getBookedSeatsByShowId(showIdUrl);
    const result: BookedSeatResponsePayload[] = [];
    bookedSeatList.forEach((bookedSeat : BookedSeatModel) => {
      const payload : BookedSeatResponsePayload =
        new BookedSeatResponsePayload();
      payload.id = bookedSeat.id;
      payload.seatId = bookedSeat.seatId;
      payload.showId = bookedSeat.showId;
      payload.bookingId = bookedSeat.bookingId;
      result.push(payload);
    });

    res.json(result);
  }
}
