import express, { Request, Response } from 'express';
import TheatreController from './src/controllers/theatre.controller';
import HeartbeatController from './src/controllers/heartbeat.controller';
import MovieController from './src/controllers/movie.controller';
import BookedSeatController from './src/controllers/booked-seat.controller';
import AccountController from './src/controllers/account.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});
// Rishi
app.get('/theatres', new TheatreController().getTheatresByCityId);
// Jitender
app.get('/movies', new MovieController().getMovieByCityId);
// Rishi
app.get('/theatres/:theatreId/movies', new MovieController().getMoviesByTheatreId);
// Tushar
app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);
// Jitender
// app.get('/theatres/:theatresId/movies', new MovieController().getMoviesByTheatreId);
// Tushar
app.get('/shows', new BookedSeatController().getBookedSeatsByMovieId);

app.post('/accounts/signup', new AccountController().signUpUserUsingEmailAndPassword);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
