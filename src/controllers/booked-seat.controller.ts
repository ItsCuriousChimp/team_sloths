import { Request, Response } from 'express';
import BookedSeatModel from '../common/models/booked-seat.model';
import BookedSeatService from '../services/booked-seat.service';
import mapper from '../common/mapper';
import BookedSeatResponsePayload from './payloads/booked-seat-response.payload';

export default class BookedSeatController {
  public async getBookedSeatsByMovieId(req: Request, res: Response) {
    const showIdUrl: string = String(req.query.showId);
    const bookedSeatServiceInstance: BookedSeatService = new BookedSeatService();
    const bookedSeatList: BookedSeatModel[] =
      await bookedSeatServiceInstance.getBookedSeatsByShowId(showIdUrl);
    const result: BookedSeatResponsePayload[] = [];
    bookedSeatList.forEach((bookedSeat: BookedSeatModel) => {
      const payload: BookedSeatResponsePayload =
        mapper.map(bookedSeat, BookedSeatModel, BookedSeatResponsePayload);
      result.push(payload);
    });
    res.json(result);
  }
}
