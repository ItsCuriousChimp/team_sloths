import express, { Request, Response } from 'express';
import TheatreController from './src/controllers/theatre.controller';
import HeartbeatController from './src/controllers/heartbeat.controller';
import MovieController from './src/controllers/movie.controller';
import BookedSeatsController from './src/controllers/booked-seat.controller';
import SignupController from './src/controllers/account.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatresByCityId);

app.get('/movies', new MovieController().getMovieByCityId);

app.get('/theatres/:theatreId/movies', new MovieController().getMoviesByTheatreId);

app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);

app.get('/shows', new BookedSeatsController().getBookedSeatsByMovieId);

app.post('/accounts/signup', new SignupController().signupUser);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
