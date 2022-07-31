import { Request, Response } from 'express';
import BookedSeatModel from '../common/models/booked-seat.model';
import BookedSeatService from '../services/booked-seat.service';
import BookedSeatResponsePayload from './payloads/booked-seat-response.payload';

export default class BookedSeatController {
  public async getBookedSeatsByMovieId(req : Request, res: Response) {
    const showIdUrl = req.body.showId;
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
