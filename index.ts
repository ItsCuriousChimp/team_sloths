import express, { Request, Response } from 'express';
import TheatreController from './components/theatre/controllers/theatre.controller';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';
import ScreenController from './components/screen/controllers/screen.controller';
import ShowController from './components/show/controllers/show.controller';
import seatStatusForShow from './computation/showsSeatStatus';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatre);

app.get('/theatres/:theatresId/shows', async (req : Request, res : Response) => {
  const theatreIdUrl : any = req.params.theatresId;
  const movieIdUrl : any = req.query.movieId;

  // Get list of all the shows
  let shows : any =
  (await new ShowController().getShowFromTreaterAndMovie(theatreIdUrl, movieIdUrl));

  // Get total number of seats in each screen of show
  const seatsInScreensForTheatreAndMovie : any =
  (await new ScreenController().getSeatFromTreaterAndMovie(theatreIdUrl, movieIdUrl));

  // Get booked seats in each show
  const bookedSeats : any =
  (await new ShowController().getBookedSeatFromTheatreAndMovie(theatreIdUrl, movieIdUrl));

  // set status of show
  shows = seatStatusForShow(shows, seatsInScreensForTheatreAndMovie, bookedSeats);

  // return show with its status
  res.send({ shows });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
