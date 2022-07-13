import express, { Request, Response } from 'express';
import TheatreController from './controllers/theatre.controller';
import HeartbeatController from './controllers/heartbeat.controller';
import BookedSeatsController from './controllers/booked-seats.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatresByCityId);

app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);

app.get('/shows', new BookedSeatsController().getBookedSeatsByMovieId);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
