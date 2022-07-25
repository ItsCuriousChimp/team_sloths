/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import BookedSeatModel from '../common/models/booked-seat.model';
import BookedSeatService from '../services/booked-seat.service';
import IdRequestPayload from './payloads/request-payload/id-request.payload';
import BookedSeatResponsePayload from './payloads/response-payload/booked-seat-response.payload';

export default class BookedSeatController {
  public async getBookedSeatsByMovieId(req : Request, res: Response) {
    const showIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.query.showId));

    try {
      await showIdRequestPayload.validate().validateAsync({ id: String(req.query.showId) });
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }
    const bookedSeatServiceInstance : BookedSeatService = new BookedSeatService();
    const bookedSeatList : BookedSeatModel[] =
    await bookedSeatServiceInstance.getBookedSeatsByShowId(showIdRequestPayload.id);
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
