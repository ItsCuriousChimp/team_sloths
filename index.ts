import express, { Request, Response } from 'express';
import TheatreController from './src/controllers/theatre.controller';
import HeartbeatController from './src/controllers/heartbeat.controller';
import MovieController from './src/controllers/movie.controller';
import BookedSeatsController from './src/controllers/booked-seat.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});
// Rishi
app.get('/theatres', new TheatreController().getTheatresByCityId);
// Jitender
app.get('/movies', new MovieController().getMovieByCityId);
// Rishi
app.get('/theatres/:theatreId/movies', new MovieController().getMoviesByCityId);
// Tushar
app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);
// Jitender
app.get('/theatres/:theatresId/movies', new MovieController().getMoviesByTheatreId);
// Tushar
app.get('/shows', new BookedSeatsController().getBookedSeatsByMovieId);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
